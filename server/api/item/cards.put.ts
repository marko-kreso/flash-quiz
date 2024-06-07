import sql from "../../utils/db"
import {z} from "zod"
import { pathSchema } from "../../utils/schemas"

export default defineEventHandler(async (event) => {
  const username = event.context.username

  const cardPutSchema = z.object({
    path: pathSchema(username),
    qa: z.array(z.object({
      question: z.string().max(256),
      answer: z.string().max(256)
    })).max(256).min(1)
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
      throw createError({
        statusCode: 401
      })
    }
    throw createError({
      statusCode: 404
    })
  }

})
