import sql from "~/server/utils/db"
import {z} from 'zod'
import { pathSchema } from "~/server/utils/schemas"

export default defineEventHandler(async (event) => {
  const querySchema = z.object({
    path: pathSchema('')
  })

  console.log('before get query')
  const {path} = await getValidatedQuery(event, (query)=>querySchema.parse(query))

  const output:{base?: string, children: {path:string, folder:boolean}[]} = {children: []}
  await sql`SELECT path FROM folders WHERE
      ${path} @> path
  `.forEach(row=>{
    if(row.path === path){
      output.base = row.path
      return
    }
    output.children.push({
      path: row.path,
      folder: true,
    })
  })
  await sql`SELECT path FROM card_sets WHERE
      ${path} @> path AND nlevel(${path})+1 = nlevel(path)
  `.forEach(row=>{
    output.children.push({
      path: row.path,
      folder: false,
    })
  })

  if(!output.base){
    throw createError({
      statusCode: 404
    })
  }

  console.log(output)
  return output.children
})
