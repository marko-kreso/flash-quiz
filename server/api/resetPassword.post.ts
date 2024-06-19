import sql from "../utils/db"
import * as argon2 from 'argon2'

import { z } from "zod"

export default defineEventHandler(async (event) => {

  const resetPassReq = z.object({
    token: z.string(),
    password: z.string(),
  })


  type signupRequest = z.infer<typeof resetPassReq>


  const body: signupRequest = await readValidatedBody(event, body=>resetPassReq.parse(body))
  const {password, token} = body

  const [passwdReset]: [PasswordChangeRequest?] = await sql`
    SELECT * FROM password_change_request WHERE
      token = sha256(${token} || salt)
      AND (now() - created_on) < '10 min'::interval;
    `
  if(!passwdReset){
    setResponseStatus(event, 400)
    throw new Error('Reset request expired')
  } 

  const newPassHash = await argon2.hash(password, {
    memoryCost: 2 ** 10 * 19, // 19 Mib
    parallelism: 1,
    timeCost: 2,
  })

  const {count} = await sql`
    UPDATE passwords SET password = ${newPassHash}
      WHERE username = ${passwdReset.username};
  `

  if(count != 1){
    throw new Error('Could not update password')
  }
  

})
