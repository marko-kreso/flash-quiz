<template>
  <main class="h-dvh">
    <div class="absolute top-1/2 left-1/3 text-8xl -translate-y-1/2 -translate-x-1/2">
      <span class="text-blue-600">Giga</span>Quiz
    </div>
    <div class="bg-white absolute top-1/2 left-2/3 p-3 border loginCard rounded-md -translate-y-1/2 -translate-x-1/2">
      <TabView :tabs="[{name: 'login', text:'Login'}, {name: 'Signup', text: 'Sign up'}]">

      <template #login>
        <form action="/login" method="post" class="flex flex-col items-center gap-3" @submit="async (event)=>{
          event.preventDefault()
          const target = event.target as HTMLFormElement

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
          console.log('start')

          const resp = contactSignup()
          console.log(resp)


          // $router.push(
          //   retUrl?.toString() ?? `/users/${signUpUsername}`
          // )
          
        }">
          <input v-model.lazy="passwd" :class="'border border-black rounded-md p-1 w-80 '" name="password" placeholder="password" type="password" minlength="8" maxlength="20" required><br>
          <input id="test" v-model.lazy="confPasswd" @change="event=>{
            const target = event.target as HTMLInputElement
            if(passwd !== confPasswd){
              target.setCustomValidity('Passwords do not match')
              return
            }
            target.setCustomValidity('')
          }" class="border border-black rounded-md p-1 w-80 " name="password" placeholder="confirm password" type="password" minlength="8" maxlength="20" required><br>
          <input v-model="signUpEmail" class="border border-black rounded-md p-1 w-80 " name="email" placeholder="email" type="text" required><br>
          <input v-model="signUpUsername"class="border border-black rounded-md p-1 w-80 " name="username" placeholder="username" type="text" required><br>
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
  const signUpUsername = ref("")
  const signUpEmail = ref("")
  // const passMatch:globalThis.Ref<null | boolean> = ref(null)
  // const borderColor = computed(()=>{
  //   if(passMatch === null){
  //     return ''
  //   }
  //   return passMatch ? 'border-green' : 'border-black'
  // })
  const retUrl = ref(useRoute().query.returnUrl)


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

  async function contactSignup(){
    return await $fetch('/api/signup',{
      method: 'POST',
      body:{
        username: signUpUsername.value,
        email: signUpEmail.value,
        password: passwd.value
      },
    })
  }

  definePageMeta({
    layout: 'blank'
  })
</script>

<style>
.loginCard{
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}
</style>