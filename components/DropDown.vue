<template>
  <div @click="hidden=!hidden">
    <slot name="toggler">
      <button>Toggle</button>
    </slot> 
      <DropDownContent :active="hidden" v-model="selected" :elements="props.elements">
      </DropDownContent>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps({
    elements: Array<string>,
  })
  const selected = defineModel<string>({required: true})
  const hidden = ref(false)
</script>
<style>

</style>