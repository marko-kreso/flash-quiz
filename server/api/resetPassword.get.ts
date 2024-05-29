import sql from "../utils/db"
import { getPasswordReset } from "../utils/query_sql"
import generateRandomValue from "../utils/tools"

export default defineEventHandler(async (event) => {
  const {id, token}: {id:string, token:string} = getQuery(event)

  if(!id){
    setResponseStatus(event, 400)
    return
  }
  const passwdReset = await sql.begin(async (sql)=>{
    return await getPasswordReset(sql, {
      id: id,
      token: token
    })
  })
  if(!passwdReset){
    setResponseStatus(event, 404)
    return
  }


})
