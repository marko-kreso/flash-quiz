<template>
  <div class="mb-2 border-2 border-slate-400 rounded-md min-h-64 card-color">
    <div>{{ props.question }}</div>
    <div v-for="answer in answers" 
    :class="{
      correct: correctAnswers.has(answer) && revealAnswer,
      incorrect: !correctAnswers.has(answer) && revealAnswer,
      selected: selectedAnswers.includes(answer),
    }"
    @click="()=>{
      if(!revealAnswer){
        if(selectedAnswers.includes(answer)){
          selectedAnswers.splice(selectedAnswers.indexOf(answer),1)
          return
        }
        selectedAnswers.push(answer)
      }
    }">
      {{ answer }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const selectedAnswers = defineModel<string[]>({default: []})

const props = defineProps<{
  question: string
  answers: string[]
  correctAnswers: string[]
}>()

const correctAnswers = new Set(props.correctAnswers)
// Will need a submit for these add a select 3?
const revealAnswer = computed(()=>selectedAnswers.value.length === correctAnswers.size)
watch(revealAnswer, (val)=>{
  console.log(val)
})

</script>

<style>
  .correct{
    @apply bg-green-500
  }
  .incorrect{
    @apply bg-red-500
  }
  .answerText{
    @apply text-lg
  }
  .selected{
    @apply border border-black border-4
  }
</style>