<template>
        <div>
          <CardList id="hello" url="https://test.com" v-slot="slotprops" class="flex items-center">
            <QuizCard v-if="!edit" class="mb-2 border-2 border-slate-400 rounded-md min-h-64">
              <template #front>hello: {{slotprops.item.front}}</template>
              <template #back>{{slotprops.item.back}}</template>
            </QuizCard>
            <div v-if="edit" class="flex flex-row justify-center">
              <textarea>{{ slotprops.item.front }}</textarea>
              <textarea>{{ slotprops.item.back }}</textarea>
            </div>
          </CardList>
        </div>
</template>
<script setup lang="ts">
const edit = useState('edit')
</script>