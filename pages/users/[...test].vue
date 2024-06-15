<template>
  <div v-if="pending">
    <NuxtLayout name="default">
      <div class="w-full h-full flex flex-col justify-center items-center">
        <LoadingSpinner></LoadingSpinner>
      </div>
    </NuxtLayout>
  </div>
  <div v-else-if="data==='folder'">
    <Folder></Folder>
  </div>
  <div v-else-if="data==='card'">
    <Flash></Flash>
  </div>
  <div v-else-if="data==='quiz'">
    <Quiz></Quiz>
  </div>
</template>

<script lang="ts" setup>
const path = useRoute().fullPath
const {data, pending, error, refresh} = await useLazyFetch(`/api/item/verifyPath?path=${path.replace("/users","")}`)
// setTimeout(()=>{data.value='quiz'; pending.value=false}, 1000)
watch(data, ()=>{
  console.log(data.value)
})
watch(error, ()=>{
  console.log(error.value)
})

definePageMeta({
layout: false,
})
</script>

<style>

</style>