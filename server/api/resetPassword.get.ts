import generateRandomValue from "../utils/tools"

export default defineEventHandler(async (event) => {
  const ID = getQuery(event).ID
  if(!ID){
    throw createError(
      {
        status: 400,
      }
    )
  }



  const userName = ''
  
})
