import * as argon2 from "argon2"
import sql, { User } from "../utils/db"
import {z} from "zod"

export default defineEventHandler(async (event) => {
  console.log("POSTING")
  const credSchema = z.object({
    username: z.string().regex(/^['a-zA-Z0-9-']+$/g).max(32),
    password: z.string().max(32).min(8),
    email: z.string().email()
  })
  type signupRequest = z.infer<typeof credSchema>
  const {username,password,email}:signupRequest =  await readValidatedBody(event, body=>credSchema.parse(body))
  console.log(username,password,email)



  await sql.begin(async (sql)=>{
      console.log('hello')
      const [user]: [User?] = await sql`
        SELECT * FROM users 
        WHERE username = ${username} OR email = ${email};
      `
      if(user){
        setResponseStatus(event, 409)
        return
      }
      console.log('hello')
      await sql`
        INSERT INTO users (username, email) 
        VALUES (${username}, ${email})
      `
      const newPassHash = await argon2.hash(password, {
        memoryCost: 2 ** 10 * 19, // 19 Mib
        parallelism: 1,
        timeCost: 2,
      })
      await sql`
        INSERT INTO passwords (username, password)
        VALUES (${username}, ${newPassHash})
      `
      await sql`INSERT INTO folders (path) VALUES (${username})`
  })


})
