import sql, { PasswordChangeRequest } from "../utils/db"
import * as argon2 from 'argon2'

import generateRandomValue from "../utils/tools"

export default defineEventHandler(async (event) => {
  const {id, token, newPass}: {id:string, token:string, newPass:string} = getQuery(event)

  if(!id){
    setResponseStatus(event, 400)
    return
  }
  const [passwdReset]: [PasswordChangeRequest?] = await sql`
    SELECT * FROM password_change_request WHERE
      id = ${id} 
      AND token = sha256(${token} || salt)
      AND (now() - created_on) < '10 min'::interval;
    `

    if(!passwdReset){
      setResponseStatus(event, 404)
      return
    }
    const newPassHash = await argon2.hash(newPass, {
      memoryCost: 2 ** 10 * 19, // 19 Mib
      parallelism: 1,
      timeCost: 2,
    })

    const rows = await sql`
      UPDATE passwords SET password = ${newPassHash}
        WHERE username = ${passwdReset.username};
    `
    if(rows.count != 1){
      setResponseStatus(event, 500)
      throw new Error('Could not update password')
    }

    setResponseStatus(event, 200)
})
