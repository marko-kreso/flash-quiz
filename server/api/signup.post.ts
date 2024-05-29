import * as argon2 from "argon2"
import sql, { User } from "../utils/db"

export default defineEventHandler(async (event) => {
  const {
    username,
    password,
    email,
  }: {username: string, password: string, email: string} = await readBody(event)

  if(password.length < 8){
    setResponseStatus(event, 400)
    return
  }

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
  })
  setResponseStatus(event, 200)
})
