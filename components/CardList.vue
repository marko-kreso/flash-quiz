<template>
  <ul class="flex flex-col items-center h-full">
    <template v-for="item,i in items">
        <slot :item="item" :i="i"></slot>
    </template>
  </ul>
</template>

<script lang="ts" setup>
  const props = defineProps(['url'])

  
  const items = defineModel<any[]>({required: true})

  // const {data, pending, error, refresh} = await useFetch(props.url!,{

  // })

  // watch(pending, ()=>{
  //   emit('loaded', error)
  // })

  const emit = defineEmits(['change','loaded'])
  

  onMounted(()=>{
    setTimeout(()=>{
      items.value=[
        {front: {
          text: 'fasdfd',
          state: '{"doc":{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"fasdf"}]}]},"selection":{"type":"text","anchor":6,"head":6}}',
        }, back:{
          text: '',
          state: '',
        }},
    ]
    console.log("MARKO")
    console.log(items.value)

    // items.value =[
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
    emit('loaded', items.value)
    }, 1000)
  })

</script>

<style>

</style>