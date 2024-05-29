import sql from "../utils/db"

export default defineEventHandler(async (event) => {
  const {path}: {path: string} = await readBody(event)
  const [questions, answers]:[string[]?, string[]?] = await sql`SELECT questions,answers FROM card_sets
  WHERE path = ${path};
  `
  if(questions === undefined || answers === undefined){
    setResponseStatus(event, 404)
    return
  }

  return {
    questions: questions,
    answers: answers,
  }
})
