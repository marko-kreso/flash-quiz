import crypto from 'crypto'
import db from '../utils/db'
// import client from '../utils/redis'

export default defineEventHandler(async (event) => {
  const body = await readBody(event, {strict: true})
  console.log("HELLO", body)

  const { stayLoggedIn } = body
  let username: string = ""
  
  switch(body.type){

    case 'local':
      username =body.credentials.username
      const {password} = body.credentials


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
  setCookie(event, 'session', session, {secure: true, httpOnly: true})
  // await client.set(session, username, {EX: stayLoggedIn ? 6000 : undefined})
  // await client.set(username, session, {EX: stayLoggedIn ? 6000 : undefined})
  // await client.set(csrf, session, {EX: stayLoggedIn ? 6000 : undefined})

  setResponseStatus(event, 200)

  return {
    csrf: csrf
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