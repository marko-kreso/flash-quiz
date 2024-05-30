import * as argon2 from "argon2"
import sql, { User } from "../utils/db"
import {z} from "zod"

export default defineEventHandler(async (event) => {
  const credSchema = z.object({
    username: z.string().regex(/^['a-zA-Z0-9-']+$/g).max(32),
    password: z.string().max(32).min(8),
    email: z.string().email()
  })
  type signupRequest = z.infer<typeof credSchema>
  const {username,password,email}:signupRequest =  await readValidatedBody(event, body=>credSchema.parse(body))


  await sql.begin(async (sql)=>{
      const [user]: [User?] = await sql`
        SELECT * FROM users 
        WHERE username = ${username} OR email = ${email};
      `
      if(user){
        setResponseStatus(event, 409)
        throw new Error("409 occured")
      }
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
      await sql`INSERT INTO folders (path) VALUES ${username}`
  })
  setResponseStatus(event, 200)
})
