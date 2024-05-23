<template>
  <ul class="flex flex-col items-center h-full">
    <template v-for="item,i in items">
        <slot :item="item" :i="i" :items="items"></slot>
    </template>
  </ul>
</template>

<script lang="ts" setup>
  const props = defineProps(['url'])

  
  const items = ref<{front: String, back:String}[]>([])

  // const {data, pending, error, refresh} = await useFetch(props.url!,{

  // })

  // watch(pending, ()=>{
  //   emit('loaded', error)
  // })

  const emit = defineEmits(['change','loaded'])
  

  onMounted(()=>{
    setTimeout(()=>{
      items.value=[{front: 'question 1', back: 'answer1'},
      {front: 'question 2', back: 'answer 2'},
       {front: 'question 1', back: 'answer1'},
       {front: 'question 2', back: 'answer 2'},
      {front: 'question 2', back: 'answer 2'},
       {front: 'question 1', back: 'answer1'},
       {front: 'question 2', back: 'answer 2'},
      {front: 'question 2', back: 'answer 2'},
       {front: 'question 1', back: 'answer1'},
       {front: 'question 2', back: 'answer 2'},
      {front: 'question 2', back: 'answer 2'},
       {front: 'question 1', back: 'answer1'},
       {front: 'question 2', back: 'answer 2'},
      {front: 'question 2', back: 'answer 2'},
       {front: 'question 1', back: 'answer1'},
       {front: 'question 2', back: 'answer 2'},
      {front: 'question 2', back: 'answer 2'},
       {front: 'question 1', back: 'answer1'},
       {front: 'question 2', back: 'answer 2'},
       {front: 'question 2', back: 'answer 2'},
      {front: 'question 2', back: 'answer 2'},
       {front: 'question 1', back: 'answer1'},
       {front: 'question 2', back: 'answer 2'},
    
    ]
      console.log(items.value)
    }, 1000)
  })

</script>

<style>

</style>