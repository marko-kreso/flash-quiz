import sql, {User} from "../utils/db"
import generateRandomValue from "../utils/tools"

export default defineEventHandler(async (event) => {
  const {userId}: {userId:string} = getQuery(event)
  if(!userId){
    setResponseStatus(event, 400)
    return
  }

  const [user]: [User?] = await sql`
    SELECT * FROM users WHERE email = ${userId} OR username = ${userId};
  `

  if(!user){
    setResponseStatus(event, 404)
    return
  }


  const id = await generateRandomValue(8)
  const token = await generateRandomValue(8)
  const salt = await generateRandomValue(8)
  
  const {count}:{count:Number} = await sql`
    INSERT INTO password_change_request (
      id, token, salt, username
    ) VALUES(${id}, sha256(${token} || ${salt}), ${salt}, ${user.username});
  `
  if(count != 1){
    setResponseStatus(event, 500)
    throw new Error('Unexpected number of rows inserted')
  }

  // TODO: ADD EMAIL EVENT
  setResponseStatus(event, 400)  
})
