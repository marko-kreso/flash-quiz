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
          <DropDown :selected="true" v-if="!edit" :elements="mapKeys" v-model="activeView">
            <template #toggler>
              <button  :class="['border', 'border-black', 'p-2', 'mr-3', 'rounded-md', ...buttonProperties]">
                <IconListElement :name="layoutIcon" :text="activeView" />
              </button>
            </template>
          </DropDown>
          <button v-if="props.session" :class="['border', 'border-black', 'p-2', 'mr-3', 'rounded-md', ...buttonProperties]" @click="()=>edit=!edit">
            <IconListElement name="ph:pencil-duotone" text="Edit" />
          </button>
        </div>
      </template>

      <template #default>
      <div class="h-full">
        <CardList v-model="items" id="hello" :url="`/api/item/cards?path=${path}`" v-slot="slotprops" class="flex items-center h-full" >
          <li v-if="!edit && activeView == View.List" class="w-1/2">
            <QuizCard  
              :correctAnswers="slotprops.item.correctAnswers" 
              :answers="slotprops.item.answers" 
              :question="slotprops.item.question" 
              class="mb-2 border-2 border-slate-400 rounded-md min-h-64"></QuizCard>
          </li>
          <li v-if="!edit && activeView == View.SideBySide" class="w-3/4">
            <div class="flex flex-row justify-center mb-2 space-x-2">
            <div class="border-2 border-slate-400 rounded-md min-h-64 flex-1 bg-white">
                <div>
                  {{ slotprops.item.question }}
                </div>
              </div>
              <div class="border-2 border-slate-400 rounded-md min-h-64 flex-1 flex-col justify-evenly flex bg-white">
                <div v-for="correctAnswer in slotprops.item.correctAnswers" class="m-2">
                  {{ correctAnswer }}
                </div>
              </div>
            </div>
          </li>
          <li :class="`w-1/2 h-full flex flex-col justify-center ${!edit && activeView == View.Carousel && currIndex == slotprops.i ? '' : 'hidden'}`">
            <div>
            <QuizCard  
              :correctAnswers="slotprops.item.correctAnswers" 
              :answers="slotprops.item.answers" 
              :question="slotprops.item.question" 
              class="mb-2 border-2 border-slate-400 rounded-md min-h-64"
              
              ></QuizCard>
              <!-- TODO: remove duplicates of this -->
              <div class="text-center">
                <button @click="()=>currIndex = 0"><Icon :size="carouselIconSizes" name="ph:caret-double-left-duotone"></Icon></button>
                <button @click="()=>currIndex=Math.max(currIndex-1,0)"><Icon :size="carouselIconSizes" name="ph:caret-left-duotone"></Icon></button>
              <div class="w-16 inline-block text-center">
                {{ currIndex+1 }} of {{ slotprops.items.length }}
              </div>
                <button @click="()=>currIndex = currIndex = Math.min(currIndex+1,slotprops.items.length-1) "><Icon :size="carouselIconSizes" name="ph:caret-right-duotone"></Icon></button>
                <button @click="()=>currIndex = slotprops.items.length-1"><Icon :size="carouselIconSizes" name="ph:caret-double-right-duotone"></Icon></button>
              </div>
            </div>
          </li>
          <li v-if="edit" class="w-3/4 flex flex-col">
            <button v-if="slotprops.i === 0" class="bg-blue-200 rounded-md" @click="items.splice(0,0,{front:'ooga', back:''})"><Icon name="ph:plus-circle-duotone" size="50px"></Icon></button>
            <div class="flex flex-row justify-center space-x-2">
              <Editor v-model="items[slotprops.i]" v-once class="border-2 border-slate-400 rounded-md min-h-64 flex-1 bg-white" contenteditable="true" @input="(event)=>{
                // const target = event.target as HTMLInputElement
                // items[slotprops.i].front = target.textContent ?? ''
                // console.log(items[slotprops.i].front)
              }"></Editor>
              <div class="border-2 border-slate-400 rounded-md min-h-64 flex-1 bg-white" contenteditable="true">{{slotprops.item.back}}</div>
            </div>
            <button @click="items = items.toSpliced(slotprops.i+1, 0,{front:'booga', back:''})" class="bg-blue-200 rounded-md" ><Icon name="ph:plus-circle-duotone" size="50px"></Icon></button>
          </li>
        </CardList>
      </div>
        </template>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import {useRoute as useNativeRoute } from 'vue-router'
console.log("FLASH")

const path = useNativeRoute().params.path

enum View{
  List = "List",
  SideBySide = "Side-By-Side",
  Carousel = "Carousel",
}

const edit = ref(true)
const props = defineProps({
  session: String
})

definePageMeta({
  layout: false
})

const mapKeys: ComputedRef<string[]> = computed(()=>[...viewMap.keys()].map((k)=>k.toString()))
const layoutIcon = computed(()=>viewMap.get(activeView.value))

const crumbs = ()=>useNativeRoute().path.split('/').slice(1).map((e,i,arr)=>{
  let path = e
  for(let j = i-1; j >= 0; j--){
    path = arr[j] + '/' + path
  }
  return {text: e, path:path}
})
const activeView = ref(View.List)
const buttonProperties = computed(()=>[edit.value ? 'bg-blue-600' : '', edit.value ? 'text-white':'', !edit.value ? 'edit':''])


const viewMap: Map<View, string> = new Map([
  [View.List, "ph:list-numbers-duotone"],
  [View.SideBySide, "ph:square-split-horizontal-duotone"],
  [View.Carousel, "ph:caret-double-right-duotone"],
])


const carouselIconSizes="2em"

const items  = ref<{front: String, back:String}[]>([])
const currIndex = ref(0)

let keyLock = 0

watch(items, ()=>{
  window.addEventListener('keydown', (e)=>{
    if(activeView.value !== View.Carousel || keyLock++){
      return
    }

    switch(e.code){
      case "ArrowDown":
      case "ArrowUp":
      case "ArrowRight":
        currIndex.value = Math.min(currIndex.value+1, items.value!.length-1)
        break
      case "ArrowLeft":
        currIndex.value = Math.max(currIndex.value-1, 0)
        break
    }
  })
  window.addEventListener('keyup', (e)=>{
    keyLock=0
  })

})

watch(currIndex, ()=>{console.log(currIndex)})
</script>

<style>
  .edit:hover{
    background-color: orange;
  }
</style>