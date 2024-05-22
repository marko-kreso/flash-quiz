<template>
  <div @click="()=>{isFlipped=!isFlipped}" class="frontToBack" :style="{
    transform: `rotateX(${isFlipped ? 180 : 0}deg)`,
    backgroundColor: 'white',
  }">
    <div style="display: inline-block; backface-visibility: hidden; transform-style: preserve-3d;">
      <slot name="front">Question</slot>
    </div>
    <br>
    <div id="back" style="transform: rotateX(-180deg); backface-visibility: hidden; position: absolute; bottom:0; transform-style: preserve-3d;">
      <slot name="back" >Answer</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const isFlipped = ref(false)
</script>

<style>
.frontToBack{
  transition: transform .35s;
  transform-style: preserve-3d;
}
</style>