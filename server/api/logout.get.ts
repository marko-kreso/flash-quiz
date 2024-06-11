import client from '../utils/redis'
export default defineEventHandler(async (event) => {
  let session = getCookie(event, 'session')
  deleteCookie(event, 'session')
  deleteCookie(event, 'loggedIn')
  if(!session){
    return
  }

  await client.del(session)
})
