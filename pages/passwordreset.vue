<template>
  <main class="h-dvh">
    <div class="absolute top-1/2 left-1/3 text-8xl -translate-y-1/2 -translate-x-1/2">
      <span class="text-blue-600">Giga</span>Quiz
    </div>
    <div class="bg-white absolute top-1/2 left-2/3 p-3 border loginCard rounded-md -translate-y-1/2 -translate-x-1/2">
      <TabView :tabs="[{name: 'login', text:'Login'}]">

      <template #login>
        <form class="flex flex-col items-center gap-3" @submit="async (event)=>{
          event.preventDefault()
          const target = event.target as HTMLFormElement

          await contactLogin()
          await navigateTo('/login')
        }">
          <input v-model="loginPassword" class="border border-black rounded-md p-1 w-80 " name="password" placeholder="password" type="password" minlength="8" maxlength="20" required><br>
          <input v-model.lazy="confPassword" @change="event=>{
            const target = event.target as HTMLInputElement
            if(signUpPassword !== confPassword){
              target.setCustomValidity('Passwords do not match')
              return
            }
            target.setCustomValidity('')
          }" class="border border-black rounded-md p-1 w-80 " name="password" placeholder="confirm password" type="password" minlength="8" maxlength="20" required><br>
        </form>
      </template>
      </TabView>
    </div>
</main>
</template>

<script lang="ts" setup>
  const signUpPassword=ref("")
  const confPassword = ref("")
  

  const token = useRoute().query.token



  async function contactLogin(): Promise<string>{
    const body = await $fetch('/api/resetPassword',{
      method: 'POST',
      body:{
        token: token
        password: signUpPassword.value,
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