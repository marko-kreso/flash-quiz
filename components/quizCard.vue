<template>
  <div @click="()=>{isFlipped=!isFlipped}" class="frontToBack" :style="{
    transform: `rotateX(${isFlipped ? 180 : 0}deg)`,
  }">
    <div style="display: inline-block; backface-visibility: hidden; transform-style: preserve-3d;">
      <slot name="front">Question</slot>
    </div>
    <br>
    <div id="back" style="transform: rotateX(-180deg); backface-visibility: hidden; display: inline-block; transform-style: preserve-3d;">
      <slot name="back" >Answer</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const isFlipped = ref(false)
</script>

<style>
.frontToBack{
  transition: transform .25s;
  transform-style: preserve-3d;
  border: solid ;
}
</style>