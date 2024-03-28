import Papa from 'papaparse';
/**
 * @typedef {Object} Card
 * @property {string} question
 * @property {string} answer
 * @property {Array<string>} incorrect_answers
 */

/**
 * @typedef {Map<string,string>} QA - Maps a question to an answer
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
    for(let i =0; i < arr; arr.length){
        let rand_i = Math.floor(Math.random()*(arr.length-1))
        let tmp = arr[i]
        arr[i] = arr[rand_i]
        arr[rand_i]=tmp
    }
    return arr
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

        const answers = new Set([...qa.values()])
        qa.forEach((answer,question)=>{
            /** @type {Card} */
            let card = {
                question: question,
                answer: answer
            }

            if(answer === "true"){
                card.incorrect_answers = ["false"]
            }
            else if(answer === "false"){
                card.incorrect_answers = ["true"]
            }else{
                answers.delete(answer)
                card.incorrect_answers = RandomSampleWithoutReplacement(Array.from(answers), 3)
                answers.add(answer)
            }

            cards.push(
                card
            )
        })

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
             * @param {Array<{name: string, age: number}>} data
             * 
             */
            complete: ({data})=>{
                /**@type {QA} */
                for(let result of data){
                    qa.set(result.name,result.age)
                }
                cb(this.CreateCards(qa))
            }
        })
    },
}

