import * as argon2 from 'argon2'
import sql, {UserWithPass} from '../utils/db'

import generateRandomValue from '../utils/tools'


// import client from '../utils/redis'
export default defineEventHandler(async (event) => {
  const body = await readBody(event, {strict: true})

  const { stayLoggedIn } = body
  let username: string = ""
  
  switch(body.type){
    case 'local':
      username =body.credentials.username
      const {password} = body.credentials
      const [user]: [UserWithPass?] = await sql`
        SELECT * FROM users INNER JOIN passwords USING (user_name)
        WHERE user_name = ${username} OR email = ${username};
      `
      if(!user){
        setResponseStatus(event, 404)
        return
      }
      if(user.banned){
        setResponseStatus(event, 403)
        return
      }
      if(!await argon2.verify(user.password, password)){
        setResponseStatus(event, 401) 
        return
      }

    case 'google':
      //handle
      break
    default:
      throw new Error('testing')
  }

  if(username === ""){
    throw new Error("username not set")
  }

  // call sql to validate password or if banned
  const session = await generateRandomValue(48)
  const csrf = await generateRandomValue(48)
  const maxAge = stayLoggedIn ? 60*60*24*30*6 : undefined //6 months
  setCookie(event, 'session', session, {secure: true, httpOnly: true, maxAge: maxAge})
  setCookie(event, 'username', username, {secure: true, httpOnly: true, maxAge: maxAge})

  // await client.set(session, username, {EX: stayLoggedIn ? 6000 : undefined})
  // await client.set(username, session, {EX: stayLoggedIn ? 6000 : undefined})
  // await client.set(csrf, session, {EX: stayLoggedIn ? 6000 : undefined})

  setResponseStatus(event, 200)

  return {
    csrf: csrf
  }
  
})