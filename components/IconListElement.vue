<template>
  <div><Icon :name="props.name" style="vertical-align: bottom;" size="1.75em" mode="svg" /><span :class="props.textClass ?? 'ml-2 text-xl'">{{ props.text }}</span></div>
</template>

<script lang="ts" setup>

  const props = defineProps(["name", "text", "textClass"])
</script>

<style>

</style>