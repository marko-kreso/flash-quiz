<template>
  <div :class="props.class + ' p-1 hover:bg-orange-400 hover:cursor-pointer'" >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
 const props = defineProps({
  class: String,
 })

</script>

<style>

</style>