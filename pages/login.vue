<template>
  <main class="h-dvh">
    <div class="absolute top-1/2 left-1/3 text-8xl -translate-y-1/2 -translate-x-1/2">
      <span class="text-blue-600">test</span>setup
    </div>
    <div class="bg-white absolute top-1/2 left-2/3 p-3 border loginCard rounded-md -translate-y-1/2 -translate-x-1/2">
      <TabView :tabs="[{name: 'login', text:'Login'}, {name: 'Signup', text: 'Sign up'}]">

      <template #login>
        <form action="/login" method="post" class="flex flex-col items-center gap-3" @submit="async (event)=>{
          event.preventDefault()
          const target = event.target as HTMLFormElement
          console.log(target)
          const username=''
          $router.push(
            retUrl?.toString() ?? `/users/${username}`
          )
        }">
          <input class="border border-black rounded-md p-1 w-80 " name="username" placeholder="email or username" type="text" required><br>
          <input class="border border-black rounded-md p-1 w-80 " name="password" placeholder="password" type="password" required><br>
          <div class="flex flex-row justify-evenly w-full">
            <button class="px-2 py-1 bg-blue-400 rounded-md text-white">Submit</button> <NuxtLink to="/forgot">forgot password?</NuxtLink> 
          </div>
        </form>
      </template>
      <template #Signup>
        <form action="/signup" method="post" class="flex flex-col items-center justify-evenly gap-3" @submit="async (event)=>{
          event.preventDefault()
          const target = event.target as HTMLFormElement
          console.log(target.action)
          // fetch(event.target.action)
          const username = ''
          $router.push(
            retUrl?.toString() ?? `/users/${username}`
          )
        }">
          <input v-model="passwd" :class="`border rounded-md p-1 w-80 ${passColor}`" name="password" placeholder="password" type="password" minlength="8" maxlength="20" required 
          @input="event=>{
            console.log(passMatch, passwd, confPasswd)
            if(passMatch === undefined){
              return
            }
            const target = event.target as HTMLInputElement
            if(passwd !== confPasswd){
              target.setCustomValidity('Passwords do not match')
              passMatch = false
              return
            }
            passMatch = true
            target.setCustomValidity('')

          }"><br>
          <input id="test" v-model="confPasswd" @input="event=>{
            if(confPasswd.length < 8){
              return
            }
            const target = event.target as HTMLInputElement
            if(passwd !== confPasswd){
              target.setCustomValidity('Passwords do not match')
              passMatch = false
              return
            }
            passMatch = true
            target.setCustomValidity('')
          }" :class="`border rounded-md p-1 w-80 ${passColor}`" name="password" placeholder="confirm password" type="password" minlength="8" maxlength="20" required><br>
          <input class="border border-black rounded-md p-1 w-80 " name="email" placeholder="email" type="text" required><br>
          <input class="border border-black rounded-md p-1 w-80 " name="username" placeholder="username" type="text" required><br>
          <div class="flex flex-row justify-evenly w-full">
            <button class="px-2 py-1 bg-blue-400 rounded-md text-white">Submit</button> 
          </div>
        </form>
      </template>
      </TabView>
    </div>
</main>
</template>

<script lang="ts" setup>

  const passwd=ref("")
  const confPasswd = ref("")
  // const passMatch:globalThis.Ref<null | boolean> = ref(null)
  // const borderColor = computed(()=>{
  //   if(passMatch === null){
  //     return ''
  //   }
  //   return passMatch ? 'border-green' : 'border-black'
  // })
  const retUrl = ref(useRoute().query.returnUrl)
  const passMatch: globalThis.Ref<boolean | undefined> = ref(undefined)
  const passColor = computed(()=>{
    switch(passMatch.value){
      case undefined:
        return 'border-black'
      case true:
        return 'border-green-600'
      case false:
        return 'border-red-600'
    }
  })


  // watch(passMatch, (newVal)=>{
  //   console.log('first')
  //   if(!passwd.value.length || !confPasswd.value.length ){
  //     console.log('inside')
  //       // pass.value.setCustomValidity("")
  //     console.log('inside2')
  //       return
  //   }
  //   console.log('seconds', passMatch)
  //   if(newVal){
  //     // pass.value.setCustomValidity("")
  //     return
  //   }
     
  //   pass.value.setCustomValidity("Passwords dont match")

  // })


  definePageMeta({
    layout: 'blank'
  })
</script>

<style>
.loginCard{
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}
</style>