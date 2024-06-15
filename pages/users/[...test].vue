<template>
  <div v-if="pending || !loaded">
    <NuxtLayout name="default">
      <div class="w-full h-full flex flex-col justify-center items-center">
        <LoadingSpinner></LoadingSpinner>
      </div>
    </NuxtLayout>
  </div>
  <div v-if="data==='folder'">
    <Fetch @loaded="(loadedItems: any)=>{
      console.log('loaded', loadedItems.length)
      loaded = true
      items = loadedItems

    }":url="`/api/item/folder?path=${path}`">
      <Folder v-if="loaded" v-model="items"></Folder>
    </Fetch>
  </div>
  <div v-else-if="data==='card'">
    <Flash></Flash>
  </div>
  <div v-else-if="data==='quiz'">
    <Quiz></Quiz>
  </div>
</template>

<script lang="ts" setup>
const path = useRoute().path
console.log(path)
const loaded = ref(false)
const items = shallowRef([])
const {data, pending, error, refresh} = await useLazyFetch(`/api/item/verifyPath?path=${path}`)
definePageMeta({
layout: false,
})
</script>

<style>

</style>