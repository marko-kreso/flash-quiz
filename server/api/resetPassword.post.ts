import sql from "../utils/db"
import { createPasswordReset } from "../utils/query_sql"
import generateRandomValue from "../utils/tools"

export default defineEventHandler(async (event) => {
  const userId = getQuery(event).userId



  const userName = ''
  const id = await generateRandomValue(8)
  const token = await generateRandomValue(8)
  const salt = await generateRandomValue(8)
  
  sql.begin(async (sql)=>{
    sql``
  })
  
})
