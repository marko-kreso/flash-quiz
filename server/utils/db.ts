import pg from 'pg'
import { createClient } from 'redis'
const config = useRuntimeConfig()

const { Client } = pg
const db = new Client({
    connectionString: config.postgres
})

export default db