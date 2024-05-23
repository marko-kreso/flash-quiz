<template>
    <div v-if="props.active" class="absolute top-14">
      <div class="bg-white w-32 border border-black rounded-md">
        <template v-for="element in props.elements" >
          <DropDownElement @click="()=>{selected=element}" :class="`${element == selected ? 'bg-slate-300' : ''}`" :element="element">{{ element }}</DropDownElement>
        </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
  const selected = defineModel<string>()
  const props = defineProps({
    active: Boolean,
    elements: Array<string>,
  })
  watch(selected, ()=>{
    console.log(selected.value)
    console.log(props.elements)
  })
</script>