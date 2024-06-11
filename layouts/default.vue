<template>
  <main class="flex-col flex h-screen">
    <div class="h-16 sticky z-10 w-full top-0 flex-shrink-0 border-b flex flex-row items-center bg-white">
      <slot name="header">
        <div class="flex flex-1 flex-row text-2xl items-center">
          <div>
            <span class="text-blue-600 text-4xl pl-2">Test</span>
          </div>
        </div>
      </slot>
    </div>
    <div class="flex-row flex flex-1 min-h-0">
      <div class="basis-48 flex flex-col border-r">
        <div class="flex-1">
          <nav class="h-full flex flex-col bg-white">
            <ul class="flex flex-col flex-1">
              <NuxtLink v-if="!session" :to="`/login?returnUrl=${encodeURIComponent($route.path.toString())}`"><li  class="flex flex-col justify-center h-12"><IconListElement name="ph:sign-in-duotone" text="Login/Sign up"/></li></NuxtLink>
              <!-- <li class="flex flex-row align-center justify-evenly mb-1"><button class="rounded-md bg-blue-400 px-3 py-2">Log in</button> <button class="rounded-md bg-orange-400 px-3 py-2">Sign up</button></li> -->
              <li v-if="session" class="flex flex-col justify-center h-12"><IconListElement name="ph:stack-duotone" text="Collection"/></li>
              <li class="flex flex-col justify-center h-12"><IconListElement name="ph:globe-simple-duotone" text="Explore"/></li>
            </ul>
            <ul class="flex flex-col justify-end flex-1">
              <NuxtLink to="/about"><li class="flex flex-col justify-center h-12"><IconListElement name="ph:question-duotone" text="About"/></li></NuxtLink>
              <NuxtLink to="/profile"><li v-if="session" class="flex flex-col justify-center h-12"><IconListElement name="ph:user-circle-duotone" text="Profile"/></li></NuxtLink>
              <NuxtLink @click="async ()=>{
                await logOut()
              }"> <li v-if="session" class="flex flex-col justify-center h-12"><IconListElement name="ph:signpost-duotone" text="Logout"/></li></NuxtLink>
            </ul>
          </nav>
        </div>
      </div>
      <div class="flex-1 basis-11/12 flex-col overflow-scroll flex">
        <slot :session="session"></slot>
      </div>
    </div>
    </main>
</template>
<script setup lang="ts">

const session = useCookie('loggedIn')
console.log('loggedIn', session.value)
async function logOut(){
  await $fetch('/api/logout')
  refreshCookie('loggedIn')
}
</script>
<style>
</style>