import crypto from 'crypto'
import { createClient } from 'redis'
const client = await createClient().on('error', err =>console.error('Redis Client Error', err)).connect()


export default defineEventHandler(async (event) => {
  const body = await readBody(event, {strict: true})

  const { stayLoggedIn } = body
  
  switch(body.type){

    case 'local':
      const {username, password} = body.credentials

      // call sql to validate password or if banned
      const session = await generateRandomValue(48)
      setCookie(event, 'session', session, {secure: true, httpOnly: true})
      await client.set(session, username, {EX: stayLoggedIn ? 6000 : undefined})
      await client.set(username, session, {EX: stayLoggedIn ? 6000 : undefined})

      setResponseStatus(event, 200)
      break
    case 'google':
      //handle
      break
    default:
      throw new Error('testing')
  }
  
})


function generateRandomValue(size:number): Promise<string>{
return new Promise((resolve, reject)=>{
        crypto.randomBytes(size, function(err, buffer){
            if(err){
              reject(err)
            }
            else{
              resolve(buffer.toString('base64'))
            } 
        })
      })

}