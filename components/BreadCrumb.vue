<template>
   <NuxtLink  external :to="props.to">{{ props.text }}</NuxtLink> 
</template>

<script lang="ts" setup>
const props = defineProps({
  text: String,
  to: String
})
</script>

<style>


</style>