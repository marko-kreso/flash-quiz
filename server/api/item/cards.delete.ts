import sql from "../../utils/db"
import {z} from 'zod'
import { pathSchema } from "../../utils/schemas"
export default defineEventHandler(async (event) => {

  const username: string = event.context.username
  

  const pathValidator = z.object({
    path: pathSchema(username)
  })

  type Request = z.infer<typeof pathValidator>
  const body: Request = await readValidatedBody(event, body => pathValidator.parse(body))

  const [questions, answers]:[string[]?, string[]?] = await sql`DELETE FROM card_sets
  WHERE path = ${body.path} AND username = ${username};
  `
  if(questions === undefined || answers === undefined){
    const {count} = await sql`SELECT * FROM card_sets WHERE path = ${body.path}`
    if(count > 0){
      throw createError({
        statusCode: 401
      })
    }
    throw createError({
      statusCode: 404
    })
  }

})
