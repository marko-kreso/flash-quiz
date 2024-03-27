

/**
 * 
 * @param {Array<string>} arr 
 * @param {string} n 
 * @returns {Array<string>} Sampled array
 */
function RandomSampleWithoutReplacement(arr, n){

    /** @type {Array<number>} */
    const out = []
    arr = [...arr]

    for(let i = 0; i < n; i++){
        out = [...out, ...arr.splice(Math.floor(Math.random()*arr.length), 1)]
    }

    return out
}

/**
 * @typedef {Map<string,string>} QA - Maps a question to an answer
 */

/**
 * @returns {QA}
 */
function ReadCsv(){

}


/**
 * 
 * @param {QA} qa 
 * @returns {Array<Card>}
 */
function CreateCards(qa){
    /** @type {Array<Card>} */
    let cards = []

    const answers = new Set([...qa.values()])
    qa.forEach((question,answer)=>{
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
            card.incorrect_answers = RandomSampleWithoutReplacement(Array.from(answers.difference(new Set([answer]))), 3)
        }

        cards.push(
            card
        )
    })

    return cards
}


/**
 * @typedef {Object} Card
 * @property {string} question
 * @property {string} answer
 * @property {Array<string>} incorrect_answers
 */


/** @type {Card} */
let card;
