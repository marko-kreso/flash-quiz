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
            <button v-if="isOwner" @click="()=>{
              activeNewFolder=true
              nextTick(()=>{
                folderInput?.focus()
              })

            }
            ":class="['border', 'border-black', 'p-2', 'mr-3', 'rounded-md']">
              <IconListElement name="ph:plus" text="Folder"/>
            </button>
            <button v-if="isOwner" :class="['border', 'border-black', 'p-2', 'rounded-md', 'mr-3']">
              <IconListElement name="ph:plus" text="Quiz" />
            </button>
          <button :class="['border', 'border-black', 'p-2', 'mr-3', 'rounded-md']">
            <IconListElement name="ph:copy-simple-duotone" text="Clone" />
          </button>
          <button v-if="isOwner" :class="['border', 'border-black', 'p-2', 'mr-3', 'rounded-md']">
            <IconListElement name="ph:trash-duotone" text="Delete" />
          </button>
        </div>
      </template>
      <template #default>
        <div v-for="dat in model" class="flex flex-col text-2xl">
          <div class="flex flex-col justify-center">
            <NuxtLink class="hover:bg-gray-200" :to="`/users${dat.path}`" :noPrefetch="!dat.isFolder">
              <div v-if="dat.isFolder"><IconListElement class="align-bottom flex items-center" name="ph:folder-simple-duotone" :size="iconSize" :text="dat.name"></IconListElement></div>
              <div v-else><IconListElement class="align-bottom flex items-center" name="ph:cards-duotone" :size="iconSize" :text="dat.name"></IconListElement></div>
            </NuxtLink>
          </div>
        </div> 
        <div v-if="activeNewFolder" class="fixed z-10 left-0 top-0 flex flex-row justify-center items-center h-full w-full bg-slate-700 bg-opacity-30">
            <div ref="textModal" class="bg-white p-16 flex flex-col justify-center items-center gap-3 text-lg rounded-md">
              New folder name:
              <input ref="folderInput" v-model="folderInputText" class="border border-black" pattern="[A-Za-z0-9 ]" autofocus requried title="Folder name cannot contain special characters"/>
              <button class="bg-blue-600 rounded-md text-white p-2">Submit</button>
            </div>
        </div>
      </template>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core';
import {useRoute as useNativeRoute } from 'vue-router'

const folderInput = ref<HTMLElement | undefined>(undefined)
const folderInputText = ref("")
const textModal = ref<HTMLElement | undefined>(undefined)
const username = useState('username', ()=>'')
const model = defineModel<{
  name: string,
  isFolder: boolean,
  path: string
}[]>({required: true})
console.log('model', model.value)

const activeNewFolder=ref(false)
const path = useNativeRoute()
console.log('path', useNativeRoute().path)
const isOwner = computed(()=>useNativeRoute().path.startsWith(`/users/${username.value}`))
const crumbs = ()=>useNativeRoute().path.split('/').slice(1).map((e,i,arr)=>{
  let path = e
  for(let j = i-1; j >= 0; j--){
    path = arr[j] + '/' + path
  }
  return {text: e, path:path}
})

const iconSize = "2rem"

onClickOutside(textModal, ()=>{
  activeNewFolder.value = false  
})
</script>

<style>
</style>