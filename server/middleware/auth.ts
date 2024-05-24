export default defineEventHandler(async (event) => {
    const test = await useStorage('redis')
    const session = getCookie(event, 'session')
    if(!session){
        
        return
    }
    if(! await test.hasItem(session)){

        return
    }

    (await test.getItem(session))!.toString() )
})
