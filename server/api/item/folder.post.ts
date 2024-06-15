import {z} from 'zod'
import { pathSchema } from '../../utils/schemas'
import sql from '../../utils/db'

export default defineEventHandler(async (event) => {
  const username = event.context.username
  console.log('STARTING')

  const pathValidator = z.object({
    path: pathSchema(username)
  })

  type Request = z.infer<typeof pathValidator>

  const body: Request = await readValidatedBody(event, body => pathValidator.parse(body))


  console.log('after parse')
  let parent = body.path.split('.').slice(-2)[0]
  console.log(parent)
  const [folderRow]:[{count: number}] = await sql`SELECT COUNT(*)::int FROM folders where path = ${parent}`
  console.log(folderRow)
  if(folderRow.count !== 1){
    throw createError({
      statusCode: 404,
      message: 'parent folder does not exist'
    })
  }

  const [{count}]:[{count: number}] = await sql`SELECT COUNT(*)::int FROM card_sets, folders WHERE card_sets.path = ${body.path} OR folders.path = ${body.path}`
  if(count !== 0){
      throw createError({
        statusCode: 409
      })
  }

  await sql`INSERT INTO folders (path) VALUES (${body.path})`

})
