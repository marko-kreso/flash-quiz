import Papa from 'papaparse';
/**
 * @typedef {Object} Card
 * @property {string} question
 * @property {string} answer
 * @property {Array<string>} incorrect_answers
 */

/**
 * @typedef {Map<string,Set<string>>} QA - Maps a question to an answers
 */
/**
 * @callback csvCallback
 * @param {Array<Card>}
 */

/**
 * 
 * @template A
 * @param {Array<A>} arr 
 * @param {number} n 
 * @returns {Array<A>} Sampled array
 */
function RandomSampleWithoutReplacement(arr, n){

    /** @type {Array<A>} */
    const out = []
    arr = [...arr]
    console.log(arr)

    for(let i = 0; i < n; i++){

        let rand_i = Math.floor(Math.random()*arr.length)
        out.push(...arr.splice(rand_i, 1)) 
    }

    console.log(out)
    return out
}


export function Shuffle(arr){
    console.log("SHUFFLE",arr)
        for(let i = 0; i < arr.length; i++){
          let rand_i = Math.floor(Math.random()*(arr.length))
          let tmp = arr[i]
          arr[i] = arr[rand_i]
          arr[rand_i] = tmp
        }
    return arr
}
const flatIterator = function* (itr){
    for(let item of itr){
        if(item[Symbol.iterator] && typeof item != "string") yield* flatIterator(item)
        else yield item
    }
}

export default{

    /**
     * 
     * @param {QA} qa 
     * @returns {Array<Card>}
     */
    CreateCards(qa){
        /** @type {Array<Card>} */
        let cards = []

        const answers = new Set([...flatIterator(qa.values())])

        console.log(answers)
        qa.forEach((question_answers,question)=>{
            /** @type {Card} */
            question_answers.forEach((question_answer)=>{
                let card = {
                    question: question,
                    answer: question_answer
                }

                if(question_answer === "true"){
                    card.incorrect_answers = ["false"]
                }
                else if(question_answer === "false"){
                    card.incorrect_answers = ["true"]
                }else{
                    for(let card_answer of qa.get(question)){
                        answers.delete(card_answer)
                    }
                    card.incorrect_answers = RandomSampleWithoutReplacement(Array.from(answers), 3)
                    for(let card_answer of qa.get(question)){
                        answers.add(card_answer)
                    }
                }

                cards.push(
                    card
                )
            })
        })
        console.log(cards)

        return cards
    },
    /**
     * 
     * @param {File} file 
     * @param {csvCallback} cb 
     */
    ReadCsv(file, cb){
        /** @type {QA} */
        const qa = new Map()
        Papa.parse(file,{
            header: true,
            dynamicTyping: true,
            /**
             * 
             * @param {Array<{question: string, answer: number}>} data
             * 
             */
            complete: ({data})=>{
                /**@type {QA} */
                for(let result of data){
                    if(qa.has(result.question)){
                        qa.get(result.question).add(result.answer)
                    }else{
                        qa.set(result.question, new Set([result.answer]))
                    }
                }
                cb(this.CreateCards(qa))
            }
        })
    },
}

