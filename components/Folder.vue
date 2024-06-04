<template>
    <NuxtLayout name="default">
      <template #header>
        <div class="flex flex-1 flex-row text-2xl items-center">
          <div>
            <span class="text-blue-600 text-4xl pl-2">Test</span>
          </div>
          <div class="ml-32 flex gap-1 font-bold">
            <BreadCrumbs  class="ml-1" sep=">">
              <BreadCrumb  v-for="path in crumbs()"class="text-blue-600" :to="`/${path.path}`" :text="path.text"></BreadCrumb>
            </BreadCrumbs>
          </div>
        </div>
        <div class="flex flex-1 flex-row justify-end items-center">
            <button :class="['border', 'border-black', 'p-2', 'mr-3', 'rounded-md']">
              <IconListElement name="ph:plus" text="Folder" />
            </button>
            <button :class="['border', 'border-black', 'p-2', 'rounded-md', 'mr-3']">
              <IconListElement name="ph:plus" text="Quiz" />
            </button>
          <button :class="['border', 'border-black', 'p-2', 'mr-3', 'rounded-md']">
            <IconListElement name="ph:copy-simple-duotone" text="Clone" />
          </button>
          <button :class="['border', 'border-black', 'p-2', 'mr-3', 'rounded-md']">
            <IconListElement name="ph:trash-duotone" text="Delete" />
          </button>
        </div>
      </template>
      <template #default>
        <div v-for="dat in files" class="flex flex-col text-2xl">
          <div class="flex flex-col justify-center">
            <NuxtLink class="hover:bg-gray-200" :to="`/users${dat.path}`" :noPrefetch="!dat.isFolder">
              <div v-if="dat.isFolder"><IconListElement class="align-bottom flex items-center" name="ph:folder-simple-duotone" :size="iconSize" :text="dat.name"></IconListElement></div>
              <div v-else><IconListElement class="align-bottom flex items-center" name="ph:cards-duotone" :size="iconSize" :text="dat.name"></IconListElement></div>
            </NuxtLink>
          </div>
        </div> 
      </template>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import {useRoute as useNativeRoute } from 'vue-router'

const props = defineProps({
  session: String
})

const path = useNativeRoute().params.path
const crumbs = ()=>useNativeRoute().path.split('/').slice(1).map((e,i,arr)=>{
  let path = e
  for(let j = i-1; j >= 0; j--){
    path = arr[j] + '/' + path
  }
  return {text: e, path:path}
})
const files = [
  {name:"folder1", isFolder: true, path: "/test"},
  {name:"folder2", isFolder: true, path: "/test"},
  {name:"item1", isFolder: false, path: "/test2"},
  {name:"item2", isFolder: false, path: "/test3/test5"},
  {name:"folder1", isFolder: true, path: "/test"},
  {name:"folder2", isFolder: true, path: "/test"},
  {name:"item1", isFolder: false, path: "/test2"},
  {name:"item2", isFolder: false, path: "/test3/test5"},
  {name:"folder1", isFolder: true, path: "/test"},
  {name:"folder2", isFolder: true, path: "/test"},
  {name:"item1", isFolder: false, path: "/test2"},
  {name:"item2", isFolder: false, path: "/test3/test5"},
  ]
const iconSize = "2rem"
</script>

<style>
</style>