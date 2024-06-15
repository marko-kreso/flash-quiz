import {z} from 'zod'
import sql from '~/server/utils/db'
import { pathSchema } from '~/server/utils/schemas'


export default defineEventHandler(async (event) => {
  const querySchema = z.object({
    path: pathSchema('')
  })

  console.log('before verify', event.path)
  const {path} = await getValidatedQuery(event, (query)=>querySchema.parse(query))
  console.log('in verify', path)

  const [{count: cardCount}]:[{count:number}]= await sql`SELECT COUNT(*) FROM card_sets WHERE path = ${path}`

  if(cardCount != 0){
    return 'card'
  }

  const [{count: folderCount}]:[{count:number}]= await sql`SELECT COUNT(*) FROM folders WHERE path = ${path}`
  if(folderCount != 0){
    return 'folder'
  }
  
  throw createError({
    statusCode: 404
  })
})
