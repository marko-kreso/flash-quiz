
const authWhitelist = new Set(['/api/login', '/api/resetPassword'])


// import redisClient from "../utils/redis"
export default defineEventHandler(async (event) => {
  const session = getCookie(event, 'session')
  if(event.node.req.method === 'GET'){
    return
  }
  if(!session){
    throw createError({
      statusCode: 401
    })
  }

  // redis get username associated with session
  const username = "GET FROM REDIS"
  event.context.username = username
  event.context.session = session

    // if(!session && event.path.startsWith('/api') && !authWhitelist.has(event.path)){
    //     sendRedirect(event, '/login')
    //     return
    // }

    if(event.path.startsWith('/api/item')){
        if(event.node.req.method !== 'GET'){
            const {path}:{path: string} = await readBody(event)
            if(!path){
                throw createError({
                  statusCode: 400
                })
            }
            if(!path.startsWith(`/${username}`)){
                throw createError({
                  statusCode: 401
                })
            }
        }
    }

    // const csrf = getHeader(event, 'csrf')

    // if(!session || !csrf){

    //     throw createError({
    //         statusCode: 401
    //     })
    //     return
    // }

    // if(await redisClient.get(csrf) !== session){
    //     throw createError({
    //         statusCode: 401
    //     })
    //     return
    // }

    // if(!username){
    
    //     throw createError({
    //         statusCode: 401
    //     })

    //     return
    // }

    // event.headers.set('username', username)
 })
