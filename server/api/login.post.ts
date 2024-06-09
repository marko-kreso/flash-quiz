import * as argon2 from 'argon2'
import sql, {UserWithPass} from '../utils/db'

import generateRandomValue from '../utils/tools'
import client from '../utils/redis'
import {z} from "zod"


// import client from '../utils/redis'
export default defineEventHandler(async (event) => {
  const credSchema = z.discriminatedUnion("type", [
    z.object(
      { 
        type: z.literal("local"), 
        username: z.union([z.string().regex(/^['a-zA-Z0-9-']+$/g).max(32), z.string().email()]),
        password: z.string().max(32).min(8),
        stayLoggedIn: z.boolean().default(false),
      }
    ),
    z.object(
      { 
        type: z.literal("google"), 
        username: z.union([z.string().regex(/^['a-zA-Z0-9-']+$/g).max(32), z.string().email()]),
        password: z.string().max(32).min(8),
        stayLoggedIn: z.boolean().default(false),
      }
    )
  ])
  type signupRequest = z.infer<typeof credSchema>
  const body: signupRequest = await readValidatedBody(event, body=>credSchema.parse(body))
  const {stayLoggedIn} = body

  let username= ''
  switch(body.type){
    case 'local':
      const {password} = body
      username = body.username
      console.log(username, password)
      const row = await sql`
        SELECT * FROM users INNER JOIN passwords USING (username)
        WHERE username = 'markokreso' OR email = 'markokreso';
      `
      console.log(row)
      const [user]: [UserWithPass?] = await sql`
        SELECT * FROM users INNER JOIN passwords USING (username)
        WHERE username = ${username} OR email = ${username};
      `
      console.log(user)
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

  // call sql to validate password or if banned
  const session = await generateRandomValue(48)
  const csrf = await generateRandomValue(48)
  const maxAge = stayLoggedIn ? 60*60*24*30*6 : undefined //6 months

    const [nAdded, expiredSet] = await Promise.all([
    client.hSet(session, {
    username: username,
    csrf: csrf,
  }),
    maxAge ? client.expire(session, maxAge) : null
    ])
    if(nAdded === 0 || expiredSet === false){
      console.log(nAdded, expiredSet)
      throw Error('Failed to set Session')
    }

  setCookie(event, 'session', session, {secure: true, httpOnly: true, maxAge: maxAge})
  return {
    csrf: csrf
  }
})