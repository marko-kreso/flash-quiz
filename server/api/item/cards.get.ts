import sql from "../../utils/db"
import {z} from "zod"
import { pathSchema } from "../../utils/schemas"
export default defineEventHandler(async (event) => {

  const username = event.context.username

  const pathValidator = z.object({
    path: pathSchema(username)
  })

  type Request = z.infer<typeof pathValidator>
  const body: Request = await getValidatedQuery(event, body => pathValidator.parse(body))

  const [questions, answers]:[string[]?, string[]?] = await sql`SELECT questions,answers FROM card_sets
  WHERE path = ${body.path};
  `
  if(questions === undefined || answers === undefined){
    throw createError({
      statusCode: 404
    })
  }

  return {
    questions: questions,
    answers: answers,
  }
})
