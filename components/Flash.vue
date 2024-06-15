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
                {{ currIndex+1 }} of {{ items.length }}
              </div>
                <button @click="()=>currIndex = currIndex = Math.min(currIndex+1,items.length-1) "><Icon :size="carouselIconSizes" name="ph:caret-right-duotone"></Icon></button>
                <button @click="()=>currIndex = items.length-1"><Icon :size="carouselIconSizes" name="ph:caret-double-right-duotone"></Icon></button>
              </div>
            </div>
          </li>
          <li v-if="edit" class="w-3/4 flex flex-col">
            <button v-if="slotprops.i === 0" class="bg-blue-200 rounded-md" @click="
            // items = [{front: 'ooga', back: ''}, ...items];
            console.log('CLICK------------')
            console.log('before items',items)
            items = items.toSpliced(0,0,emptyCard())
            console.log('items',items)
            "><Icon name="ph:plus-circle-duotone" size="50px"></Icon></button>
            <div :key="(new Date()).getTime() + Math.floor(Math.random() * 10000).toString()" class="p-1 ">
              <div class="flex flex-row gap-1">
              <button @click="()=>{
                if(items.length === 1){
                  return
                }
                items = items.toSpliced(slotprops.i,1) 
              }
              ">
              <Icon name="ph:trash-duotone" size="2em"></Icon></button>
              <button @click="()=>{
                if(slotprops.i === 0){
                  return
                }
                // const tmp = items[slotprops.i-1]
                // items[slotprops.i-1] = items[slotprops.i]
                // items[slotprops.i] = tmp
                items = swap(items, slotprops.i-1, slotprops.i)
              }
              "><Icon name="ph:arrow-up-duotone"  size="2em"></Icon></button>
              <button @click="()=>{
                if(slotprops.i === items.length-1){
                  return
                }
                items = swap(items, slotprops.i, slotprops.i+1)
              }
              "><Icon name="ph:arrow-down-duotone"size="2em"></Icon></button>
              <input @keypress="(event: InputEvent)=>{
                if(event.key !== 'Enter'){
                  return true
                }
                if(event.target.value < 1 || event.target.value > items.length){
                  event.target.value = slotprops.i+1
                  return true
                }
                let i = event.target.value-1
                items = swap(items, Math.min(slotprops.i, i), Math.max(slotprops.i, i))
              }" :defaultValue="slotprops.i+1">
              </div>
              <hr>
            <div   class="flex flex-col justify-center gap-2 mt-1">
              <Editor v-model="items[slotprops.i].front" class="flex border-2 border-slate-400 rounded-md min-h-64 bg-white" @input="(event)=>{
                // const target = event.target as HTMLInputElement
                // // items[slotprops.i].front = target.textContent ?? ''
                // console.log(items[slotprops.i].front)
              }"></Editor>
              <Editor v-model="items[slotprops.i].back" class="flex border-2 border-slate-400 rounded-md min-h-64 bg-white" @input="(event)=>{
                // const target = event.target as HTMLInputElement
                // // items[slotprops.i].front = target.textContent ?? ''
                // console.log(items[slotprops.i].front)
              }"></Editor>
              <!-- <div class="border-2 border-slate-400 rounded-md min-h-64 flex-1 bg-white" contenteditable="true">{{items[slotprops.i].back}}</div> -->
            </div>

            </div>
            <button @click="items = items.toSpliced(slotprops.i+1, 0, emptyCard())" class="bg-blue-200 rounded-md" ><Icon name="ph:plus-circle-duotone" size="50px"></Icon></button>
          </li>
        </CardList>
      </div>
        </template>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import {useRoute as useNativeRoute } from 'vue-router'

const emptyCard:any = ()=>{return{
  front:{
    text: '',
    state: '',
  },
  back:{
    text: '',
    state: '',
  }
}}

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
function swap(arr:Array<any>, src:number, dest:number){
  console.log(src, dest)
  return [...arr.slice(0,src), arr[dest], arr[src], ...arr.slice(dest+1)]
}

const mapKeys: ComputedRef<string[]> = computed(()=>[...viewMap.keys()].map((k)=>k.toString()))
const layoutIcon = computed(()=>viewMap.get(activeView.value))

const items  = shallowRef<{
  front: {
    text: string,
    state: string,
  }, 
  back:{
    text: string,
    state: string,
  }}[]>([])
  watch(items, ()=>{
    console.log('items', items.value)
  })
// const blur =()=>{
//   console.log(document.activeElement)
//   document.activeElement.blur()
// }
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

const currIndex = ref(0)

let keyLock = 0

watch(items, ()=>{
  console.log(items.value)
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

watch(currIndex, ()=>{console.log(currIndex)})

function cursor_position() {
    var sel = document.getSelection();
    if(sel == null){
      return
    }
    sel.modify("extend", "backward", "paragraphboundary");
    var pos = sel.toString().length;
    if(sel.anchorNode != undefined) sel.collapseToEnd();

    return pos;
}

</script>

<style>
  .edit:hover{
    background-color: orange;
  }
</style>