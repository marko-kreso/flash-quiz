<template>
  <div v-if="pending">
    <NuxtLayout name="default">
      <template #header>
        <div class="flex flex-1 flex-row text-2xl items-center">
          <div>
            <span class="text-blue-600 text-4xl pl-2">Test</span>
          </div>
          <div class="ml-32 flex gap-1 font-bold">
            <BreadCrumbs  class="ml-1" sep=">">
              <template v-for="path in crumbs()" #[path.text]>
                <BreadCrumb  class="text-blue-600" :to="`/${path.path}`" :text="path.text"></BreadCrumb>
              </template>
            </BreadCrumbs>
          </div>
        </div>
      </template>
      <div class="w-full h-full flex flex-col justify-center items-center">
        <LoadingSpinner></LoadingSpinner>
      </div>
    </NuxtLayout>
  </div>
  <div v-if="data==='folder'">
    <Folder></Folder>
    <!-- <Fetch @loaded="(loadedItems: any)=>{
      console.log('loaded', loadedItems.length)
      loaded = true
      items = loadedItems

    }":url="`/api/item/folder?path=${path}`"> -->
    <!-- </Fetch> -->
  </div>
  <div v-else-if="data==='card'">
    <Flash></Flash>
  </div>
  <div v-else-if="data==='quiz'">
    <Quiz></Quiz>
  </div>
</template>

<script lang="ts" setup>
import {useRoute as useNativeRoute } from 'vue-router'
const path = useRoute().path
console.log(path)
const loaded = ref(false)
const items = shallowRef([])
const {data, pending, error, refresh} = await useLazyFetch(`/api/item/verifyPath?path=${path}`)
definePageMeta({
layout: false,
})
const crumbs = ()=>useNativeRoute().path.split('/').slice(1).map((e,i,arr)=>{
  console.log('crumbs')
  let path = e
  for(let j = i-1; j >= 0; j--){
    path = arr[j] + '/' + path
  }
  return {text: e, path:path}
})
</script>

<style>

</style>