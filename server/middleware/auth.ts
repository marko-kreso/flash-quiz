
// import redisClient from "../utils/redis"
export default defineEventHandler(async (event) => {
    const session = getCookie(event, 'session')

    if(event.path === "/api/login" && !session){
        console.log('returning')
        return
    }

    // if(!session){
    //     sendRedirect(event, '/login')
    //     return
    // }
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

    // const username = await redisClient.get(session)
    // if(!username){
    
    //     throw createError({
    //         statusCode: 401
    //     })

    //     return
    // }

    // event.headers.set('username', username)
 })
