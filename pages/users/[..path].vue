<template>
    <div v-if="pending">
      <LoadingSpinner></LoadingSpinner>
    </div>
    <!-- TODO: Move to its own component like index.vue -->
    <div v-else-if="data==='card'" class="h-full">
      <CardList @loaded="(elements)=>items=elements" id="hello" :url="`/api/item/cards?path=${path}`" v-slot="slotprops" class="flex items-center h-full" >
        <li v-if="!edit && currView == View.List" class="w-1/2">
          <QuizCard  class="mb-2 border-2 border-slate-400 rounded-md min-h-64">
            <template #front>{{slotprops.item.front}}</template>
            <template #back>{{slotprops.item.back}}</template>
          </QuizCard>
        </li>
        <li v-if="!edit && currView == View.SideBySide" class="w-3/4">
          <div class="flex flex-row justify-center mb-2 space-x-2">
            <div class="border-2 border-slate-400 rounded-md min-h-64 flex-1 bg-white">{{slotprops.item.front}}</div>
            <div class="border-2 border-slate-400 rounded-md min-h-64 flex-1 bg-white">{{slotprops.item.back}}</div>
          </div>
        </li>
        <li v-if="!edit && currView == View.Carousel && currIndex == slotprops.i" class="w-1/2 h-full flex flex-col justify-center">
          <div>
            <QuizCard v-model="carouselCard"  class="mb-2 border-2 border-slate-400 rounded-md min-h-64">
              <template #front>{{slotprops.item.front}}</template>
              <template #back>{{slotprops.item.back}}</template>
            </QuizCard>
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
            <div class="border-2 border-slate-400 rounded-md min-h-64 flex-1 bg-white" contenteditable="true">{{slotprops.item.front}}</div>
            <div class="border-2 border-slate-400 rounded-md min-h-64 flex-1 bg-white" contenteditable="true">{{slotprops.item.back}}</div>
          </div>
        </li>
      </CardList>
    </div>
    <div v-else-if="data==='folder'">
      <CardList @loaded="(elements)=>elements" :url="`/api/item/folder?path=${path}`" v-slot="slotprops" class="flex items-center h-full" >
          <div v-for="item in slotprops.items">{{ item }}</div>
      </CardList>
    </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const path = route.params.path
const {data, pending, error, refresh} = await useLazyFetch(`/api/cards/verifyPath?path=${path}`)

watch(error, ()=>{
  throw createError({
    statusCode: error.value?.statusCode,
    statusMessage: error.value?.statusMessage
  }
  )
})

const edit = useState('edit')
const currView = useState('activeView')
enum View{
  List = "List",
  SideBySide = "Side-By-Side",
  Carousel = "Carousel",
}
const carouselIconSizes="2em"
const carouselCard = ref(false)

const items: Ref<{front: String, back:String}[]|null> = ref(null)
const currIndex = ref(0)

let keyLock = 0

watch(items, ()=>{
  window.addEventListener('keydown', (e)=>{
    if(currView.value !== View.Carousel || keyLock++){
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

</script>

<style>

</style>