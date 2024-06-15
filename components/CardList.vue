<template>
  <ul class="flex flex-col items-center h-full">
    <template v-for="item,i in items">
        <slot :item="item" :i="i" :items="items"></slot>
    </template>
  </ul>
</template>

<script lang="ts" setup>
  const props = defineProps({
    url: {
      type: String,
      required: true
    }
  })

  
  const items = ref<any[]>([])

  // const {data, pending, error, refresh} = await useFetch(props.url!,{

  // })

  // watch(pending, ()=>{
  //   emit('loaded', error)
  // })

  const emit = defineEmits(['loaded'])
  const { data, pending, error, refresh, clear } = await useFetch(props.url)
  
  watch(pending,()=>{
    console.log('ending', pending)
    if(pending.value){
      return
    }
    if(error.value){
      throw error
    }
    emit("loaded", data.value)
  }, {immediate: true})

  onMounted(()=>{
    // setTimeout(()=>{
    // //   items.value=[
    // //     {front: 'question 1', back: 'answer1'},
    // //   {front: 'question 2', back: 'answer 2'},
    // //    {front: 'question 1', back: 'answer1'},
    // //    {front: 'question 2', back: 'answer 2'},
    // //   {front: 'question 2', back: 'answer 2'},
    // //    {front: 'question 1', back: 'answer1'},
    // //    {front: 'question 2', back: 'answer 2'},
    // //   {front: 'question 2', back: 'answer 2'},
    // //    {front: 'question 1', back: 'answer1'},
    // //    {front: 'question 2', back: 'answer 2'},
    // //   {front: 'question 2', back: 'answer 2'},
    // //    {front: 'question 1', back: 'answer1'},
    // //    {front: 'question 2', back: 'answer 2'},
    // //   {front: 'question 2', back: 'answer 2'},
    // //    {front: 'question 1', back: 'answer1'},
    // //    {front: 'question 2', back: 'answer 2'},
    // //   {front: 'question 2', back: 'answer 2'},
    // //    {front: 'question 1', back: 'answer1'},
    // //    {front: 'question 2', back: 'answer 2'},
    // //    {front: 'question 2', back: 'answer 2'},
    // //   {front: 'question 2', back: 'answer 2'},
    // //    {front: 'question 1', back: 'answer1'},
    // //    {front: 'question 2', back: 'answer 2'},
    
    // // ]
    // items.value=[
    //   {
    //   question: "How old are you?", 
    //   answers:["correct", "incorrect"],
    //   correctAnswers:["correct"]
    //   },
    //   {
    //   question: "How old are you?", 
    //   answers:["correct", "incorrect", "incorrect2"],
    //   correctAnswers:["correct"]
    //   },
    //   {
    //   question: "How old are you?", 
    //   answers:["correct", "incorrect", "incorrect2", "correct2"],
    //   correctAnswers:["correct", "correct2"]
    //   },
    // ]
    // emit('loaded', items.value)
    // }, 1000)
  })

</script>

<style>

</style>