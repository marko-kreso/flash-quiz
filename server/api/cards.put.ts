import sql from "../utils/db"
import {z} from "zod"

export default defineEventHandler(async (event) => {
  const session = getCookie(event, 'session')
  if(!session){
    setResponseStatus(event, 401)
    return
  }
  // redis get username associated with session
  const username = "GET FROM REDIS"
  if(username !== session){
    setResponseStatus(event, 401)
    return
  }

  const cardPutSchema = z.object({
    path: z.string().max(256).startsWith(`/${username}`),
    qa: z.array(z.object({
      question: z.string().max(256),
      answer: z.string().max(256)
    })).max(256)
  })
  type Request = z.infer<typeof cardPutSchema>

  const body: Request = await readValidatedBody(event, body => cardPutSchema.parse(body))

  const questions = body.qa.map((e)=>e.question)
  const answers = body.qa.map((e)=>e.answer)


  const {count} = await sql`UPDATE card_sets
  SET questions = ${questions}, answers = ${answers}
  WHERE path = ${body.path} AND username = ${username};
  `
  if(count !== 1){
    const {count: existsCount} = await sql`SELECT * FROM card_sets WHERE path = ${body.path}`
    if(existsCount > 0){
      setResponseStatus(event, 401)
      return
    }
    setResponseStatus(event, 404)
    return
  }

  setResponseStatus(event, 200)
})
