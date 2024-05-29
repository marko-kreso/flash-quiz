import sql from "../utils/db"
import {z} from 'zod'
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
  const pathSchema = z.object({
    path: z.string().max(256).startsWith(`/${username}`).regex(/^\/[\/\w]+\w+$/g)
  })
  type Request = z.infer<typeof pathSchema>
  const body: Request = await readValidatedBody(event, body => pathSchema.parse(body))
  const path = body.path = body.path.split('/').slice(1).join('.')

  const [questions, answers]:[string[]?, string[]?] = await sql`DELETE FROM card_sets
  WHERE path = ${body.path} AND username = ${username};
  `
  if(questions === undefined || answers === undefined){
    const {count} = await sql`SELECT * FROM card_sets WHERE path = ${body.path}`
    if(count > 0){
      setResponseStatus(event, 401)
      return
    }
    setResponseStatus(event, 404)
    return
  }

  setResponseStatus(event, 200)
})
