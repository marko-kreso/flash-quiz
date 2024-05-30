import sql from "../../utils/db"
import {z} from 'zod'
import { pathSchema } from "../../utils/schemas"
export default defineEventHandler(async (event) => {
  const username:string = event.context.username

  const pathValidator = z.object({
    path: pathSchema(username)
  })


  type Request = z.infer<typeof pathValidator>

  const body: Request = await readValidatedBody(event, body => pathValidator.parse(body))

  const [{count: conflictCount}]:[{count: number}] = await sql`SELECT COUNT(*) FROM card_sets, folders WHERE card_sets.path = ${body.path} OR folders.path = ${body.path}`
  if(conflictCount !== 0){
    throw createError({
      statusCode: 409,
      message: 'naming conflict'
    })
  }

  await sql`INSERT card_sets INTO path, username, questions, answers
  VALUES (${body.path}, ${username}, ${[]}, ${[]});
  `
})

