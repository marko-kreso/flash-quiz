import { createClient } from 'redis'

const client = await createClient({
  url: process.env.REDIS_CONNECTION 
}).on('error', err =>console.error('Redis Client Error', err)).connect()

export default client