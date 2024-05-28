<template>
  <main class="h-dvh">
    <div class="absolute top-1/2 left-1/3 text-8xl -translate-y-1/2 -translate-x-1/2">
      <span class="text-blue-600">Giga</span>Quiz
    </div>
    <div class="bg-white absolute top-1/2 left-2/3 p-3 border border-black rounded-md -translate-y-1/2 -translate-x-1/2">
      <TabView :tabs="[{name: 'login', text:'Login'}, {name: 'Signup', text: 'Sign up'}]">

      <template #login>
        <form class="flex flex-col items-center gap-3">
          <input class="border border-black rounded-md p-1 w-80 " name="username" placeholder="email or username" type="text" required><br>
          <input class="border border-black rounded-md p-1 w-80 " name="password" placeholder="password" type="password" required><br>
          <div class="flex flex-row justify-evenly w-full">
            <button class="px-2 py-1 bg-blue-400 rounded-md text-white">Submit</button> <NuxtLink to="/forgot">forgot password?</NuxtLink> 
          </div>
        </form>
      </template>
      <template #Signup>
        <form class="flex flex-col items-center justify-evenly gap-3">
          <input @change="(e)=>passwd = e.target?.value"class="border border-black rounded-md p-1 w-80 " name="password" placeholder="password" type="password" minlength="8" maxlength="20" required><br>
          <input ref="pass" @change="(e)=>confPasswd = e.target?.value" class="border border-black rounded-md p-1 w-80 " name="password" placeholder="confirm password" type="password" minlength="8" maxlength="20" required><br>
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
  const passMatch = computed(()=>passwd.value===confPasswd.value)
  const pass:any = ref(null)

  watch(passMatch, (newVal)=>{
    console.log('first')
    if(!passwd.value.length || !confPasswd.value.length ){
        pass.value.setCustomValidity("")
        return
    }
    console.log('seconds', passMatch)
    if(newVal){
      pass.value.setCustomValidity("")
      return
    }
     
    pass.value.setCustomValidity("Passwords dont match")

  })


  definePageMeta({
    layout: 'blank'
  })
</script>

<style>

</style>