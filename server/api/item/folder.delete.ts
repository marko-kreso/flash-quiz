import {z} from 'zod'
import { pathSchema } from '../../utils/schemas'
import sql from '../../utils/db'

export default defineEventHandler(async (event) => {
  const username = event.context.username

  const pathValidator = z.object({
    path: pathSchema(username)
  })

  type Request = z.infer<typeof pathValidator>

  const body: Request = await readValidatedBody(event, body => pathValidator.parse(body))
  const {count} = await sql`DELETE FROM folders where ${body.path} @> path`
  if(count !== 1){
      throw createError({
        statusCode: 404
      })
  }

})
