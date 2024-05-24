import pg from 'pg'
const config = useRuntimeConfig()

const { Client } = pg
const db = new Client({
    connectionString: config.postgres
})

export default db