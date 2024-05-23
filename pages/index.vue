<template>
        <div>
          <CardList id="hello" url="https://test.com" v-slot="slotprops" class="flex items-center" :liClass="edit || currView==View.SideBySide ? 'w-3/4': 'w-1/2'">
            <QuizCard v-if="!edit && currView == View.List" class="mb-2 border-2 border-slate-400 rounded-md min-h-64">
              <template #front>{{slotprops.item.front}}</template>
              <template #back>{{slotprops.item.back}}</template>
            </QuizCard>
            <div v-if="!edit && currView == View.SideBySide" class="flex flex-row justify-center mb-2 space-x-2">
              <div class="border-2 border-slate-400 rounded-md min-h-64 flex-1 bg-white">{{slotprops.item.front}}</div>
              <div class="border-2 border-slate-400 rounded-md min-h-64 flex-1 bg-white">{{slotprops.item.back}}</div>
            </div>
            <div v-if="edit" class="flex flex-row justify-center mb-2 space-x-2">
              <div class="border-2 border-slate-400 rounded-md min-h-64 flex-1 bg-white" contenteditable="true">{{slotprops.item.front}}</div>
              <div class="border-2 border-slate-400 rounded-md min-h-64 flex-1 bg-white" contenteditable="true">{{slotprops.item.back}}</div>
            </div>
          </CardList>
        </div>
</template>
<script setup lang="ts">
const edit = useState('edit')
const currView = useState('activeView')
watch(currView, ()=>{
  console.log(currView)
})
enum View{
  List = "List",
  SideBySide = "Side-By-Side",
  Carousel = "Carousel",
}
</script>