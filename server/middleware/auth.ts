import { useCookie, useNuxtApp, useRequestHeaders } from "nuxt/app"
import client from "../utils/redis"

const authWhitelist = new Set(['/api/login', '/api/resetPassword', '/api/signup'])


// import redisClient from "../utils/redis"
export default defineEventHandler(async (event) => {
  const path = event.path.split('?')[0]
  console.log('path')
  const session = getCookie(event, 'session')

  if(path === '/login' && session){
    const {username} = await client.hGetAll(session)
    console.log(username)
    if(!username){
      deleteCookie(event, 'loggedIn')
      return
    }
    sendRedirect(event, `/users/${username}`)
  }
  if(authWhitelist.has(path)){
    return
  }
  if(event.node.req.method === 'GET'){
    return
  }

  if(!session){
    throw createError({
      statusCode: 401
    })
  }

  const csrfHeader = event.headers.get('csrf')
  const {csrf, username} = await client.hGetAll(session)
  console.log('verifying csrf', csrf === csrfHeader)
  if(csrf !== csrfHeader){
    deleteCookie(event, 'loggedIn')
    throw createError({
      statusCode: 401
    })
  }

  event.context.username = username
  event.context.session = session
  console.log('context')
  console.log(event.context.username)
  setCookie(event, 'loggedIn', 'true')

    // if(!session && path.startsWith('/api') && !authWhitelist.has(path)){
    //     sendRedirect(event, '/login')
    //     return
    // }

    if(path.startsWith('/api/item')){
        if(event.node.req.method !== 'GET'){
            const {path}:{path: string} = await readBody(event)
            if(!path){
                throw createError({
                  statusCode: 400
                })
            }
            if(!path.startsWith(`/users/${username}`)){
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
