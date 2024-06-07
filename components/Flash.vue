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
        <div class="flex flex-1 flex-row justify-end items-center gap-5">
          <DropDown :selected="true" v-if="!edit" :elements="mapKeys" v-model="activeView">
            <template #toggler>
              <button  :class="['border', 'border-black', 'p-2', 'rounded-md', ...buttonProperties]">
                <IconListElement :name="layoutIcon" :text="activeView" />
              </button>
            </template>
          </DropDown>
          <button v-if="props.session && !edit" :class="['border', 'border-black', 'p-2', 'mr-3', 'rounded-md', ...buttonProperties]" @click="()=>edit=!edit">
            <IconListElement name="ph:pencil-duotone" text="Edit" />
          </button>
          <button :class="['border', 'border-black', 'p-2', 'mr-3', 'rounded-md', ...buttonProperties]" @click="()=>{
            saving = true
            SaveState(path, 
              items!.map((e)=>e.front),
              items!.map((e)=>e.back),
            )
            }">
            Confirm
          </button>
          <button v-if="props.session && edit" :class="['border', 'border-black', 'p-2', 'mr-3', 'rounded-md', ...buttonProperties]" @click="()=>edit=!edit">
            Cancel
          </button>
        </div>
      </template>

      <template #default>
      <div class="h-full">
        <CardList @loaded="(elements)=>items=elements" id="hello" :url="`/api/item/cards?path=${path}`" v-slot="slotprops" class="flex items-center h-full" >
          <li v-if="!edit && activeView == View.List" class="w-1/2">
            <FlashCard  class="mb-2 border-2 border-slate-400 rounded-md min-h-64">
              <template #front>{{slotprops.item.front}}</template>
              <template #back>{{slotprops.item.back}}</template>
            </FlashCard>
          </li>
          <li v-if="!edit && activeView == View.SideBySide" class="w-3/4">
            <div class="flex flex-row justify-center mb-2 space-x-2">
              <div class="border-2 border-slate-400 rounded-md min-h-64 flex-1 bg-white">{{slotprops.item.front}}</div>
              <div class="border-2 border-slate-400 rounded-md min-h-64 flex-1 bg-white">{{slotprops.item.back}}</div>
            </div>
          </li>
          <li v-if="!edit && activeView == View.Carousel && currIndex == slotprops.i" class="w-1/2 h-full flex flex-col justify-center">
            <div>
              <FlashCard v-model="carouselCard"  class="mb-2 border-2 border-slate-400 rounded-md min-h-64">
                <template #front>{{slotprops.item.front}}</template>
                <template #back>{{slotprops.item.back}}</template>
              </FlashCard>
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
          <li v-if="edit" class="w-3/4">
            <div class="flex flex-row justify-center mb-2 space-x-2">
              <div class="border-2 border-slate-400 rounded-md min-h-64 flex-1 bg-white" @change="" contenteditable="true">{{slotprops.item.front}}</div>
              <div class="border-2 border-slate-400 rounded-md min-h-64 flex-1 bg-white" contenteditable="true">{{slotprops.item.back}}</div>
            </div>
          </li>
        </CardList>
      </div>
      <div v-if="activeToast" class="toast">
          <div class="lds-dual-ring align-middle mr-3" v-if="saving"></div>
          <span class="text-blue" @click="()=>{
          saving=!saving
          }
          ">
          <span :class="{
            saved: !saving,
          }">{{ saving ? "Saving ..." : "Saved!" }}</span></span>
      </div>
        </template>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import {useRoute as useNativeRoute } from 'vue-router'
console.log("FLASH")
const path = useNativeRoute().path

enum View{
  List = "List",
  SideBySide = "Side-By-Side",
  Carousel = "Carousel",
}

const edit = ref(false)
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
const carouselCard = ref(false)

const items: Ref<{front: string, back:string}[]|null> = ref(null)
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
      case "Space":
        carouselCard.value = !carouselCard.value
        break
      case "ArrowRight":
        currIndex.value = Math.min(currIndex.value+1, items.value!.length-1)
        carouselCard.value = false
        break
      case "ArrowLeft":
        currIndex.value = Math.max(currIndex.value-1, 0)
        carouselCard.value = false
        break
    }
  })
  window.addEventListener('keyup', (e)=>{
    keyLock=0
  })

})
const saving = ref(false)
const activeToast = ref(false)
watch(saving, (val)=>{
  if(!val){
    setTimeout(()=>{
      activeToast.value = false},3000)
  }else{
    activeToast.value = true
  }
})

watch(currIndex, ()=>{console.log(currIndex)})

function SaveState(path: string, questions: string[], answers: string[]){
  const {data, error} = useFetch('/api/item/cards',{
    method: "PUT",
    body: {
      path: path,
      qa: questions.map((e,i)=>{
        return {
          question: e,
          answer: answers[i]
        }
      })
    }
  })

}
</script>

<style>
  .edit:hover{
    background-color: orange;
  }

.lds-dual-ring{
  color: blue;
}
.lds-dual-ring:after {
  box-sizing: border-box;
}
.lds-dual-ring {
  display: inline-block;
  width: 20px;
  height: 20px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid currentColor;
  border-color: currentColor transparent currentColor transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.toast{
  @apply bg-white inline-block fixed bottom-2 right-1 p-5 border border-black  rounded-md
}
.saved{
  @apply text-green-600 font-bold
}

</style>