
export default defineEventHandler(async (event) => {
  deleteCookie(event, 'session')
  // Call redis to delete the following session
  event.context.session 
})
