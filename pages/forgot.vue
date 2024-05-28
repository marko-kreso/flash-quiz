<template>
    <main class="h-dvh">
        <div class="absolute top-1/2 left-1/3 text-8xl -translate-y-1/2 -translate-x-1/2">
        <span class="text-blue-600">Giga</span>Quiz
        </div>
        <div class="loginCard bg-white absolute top-1/2 left-2/3 p-3 border rounded-md -translate-y-1/2 -translate-x-1/2">
            <form class="flex flex-col items-center gap-3">
                <div class="w-80">
                Send a password reset link to the email associated with the account
                </div>
                <input class="border border-gray rounded-md p-1 w-80 " name="username" placeholder="email or username" type="text" required><br>
                <div class="flex flex-row justify-evenly w-full">
                <button class="px-2 py-1 bg-blue-400 rounded-md text-white">Submit</button>
                </div>
            </form>
        </div>
    </main>
</template>

<script lang="ts" setup>
  definePageMeta({
    layout: 'blank'
  })
</script>

<style>
.loginCard{
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}
</style>