<template>
  <div class="mb-2 border-2 border-slate-400 rounded-md min-h-64">
    <div>{{ props.question }}</div>
    <div v-for="answer in answers" 
    :class="{
      correct: correctAnswers.has(answer) && revealAnswer,
      incorrect: !correctAnswers.has(answer) && revealAnswer,
      selected: selectedAnswers.has(answer),
    }"
    @click="()=>{
      if(!revealAnswer){
        if(selectedAnswers.has(answer)){
          selectedAnswers.delete(answer)
          return
        }
        selectedAnswers.add(answer)
      }
    }">
      {{ answer }}
    </div>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
  question: string
  answers: string[]
  correctAnswers: string[]
}>()

const selectedAnswers: Ref<Set<string>> = ref(new Set())
const correctAnswers = new Set(props.correctAnswers)
const revealAnswer = computed(()=>{
  let totalCorrect = 0
  console.log('hello')
  for(const selectedAnswer of selectedAnswers.value){
    if(correctAnswers.has(selectedAnswer)){
      totalCorrect++
    }else{
      return true
    }
  }
  console.log(totalCorrect)
  console.log('hello')

  return totalCorrect === correctAnswers.size ? true : false
})
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