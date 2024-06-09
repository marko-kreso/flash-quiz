
export default defineEventHandler(async (event) => {
  deleteCookie(event, 'session')
  deleteCookie(event, 'loggedIn')
  // Call redis to delete the following session
  event.context.session 
})
