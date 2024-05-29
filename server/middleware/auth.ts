
const authWhitelist = new Set(['/api/login', '/api/resetPassword'])


// import redisClient from "../utils/redis"
export default defineEventHandler(async (event) => {
    const session = getCookie(event, 'session')
    // const username = await redisClient.get(session)
    // const 


    if(!session && event.path.startsWith('/api') && !authWhitelist.has(event.path)){
        sendRedirect(event, '/login')
        return
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
