import { createClient } from 'redis'
const config = useRuntimeConfig()

// const client = await createClient({
//   url: config.redis 
// }).on('error', err =>console.error('Redis Client Error', err)).connect()

// export default client