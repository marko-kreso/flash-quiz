import sql from "../utils/db"
import {z} from 'zod'
export default defineEventHandler(async (event) => {
  // move to middleware
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
    path: z.string().max(256).startsWith(`/${username}`)
  })

  type Request = z.infer<typeof pathSchema>

  const body: Request = await readValidatedBody(event, body => pathSchema.parse(body))

  const {count} = await sql`INSERT card_sets INTO path, username, questions, answers
  VALUES (${body.path}, ${username}, ${[]}, ${[]});
  `
  if(count !== 1){
    const {count: existsCount} = await sql`SELECT * FROM card_sets WHERE path = ${body.path}`
    if(existsCount > 0){
      setResponseStatus(event, 409)
      return
    }
    setResponseStatus(event, 500)
    return
  }

  setResponseStatus(event, 200)
})

