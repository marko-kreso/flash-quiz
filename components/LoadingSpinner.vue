<template>
  <div class="lds-ripple"><div></div><div></div></div>
</template>

<script lang="ts" setup>

const props = defineProps<
{
  width: string,
  height: string,

}
>()
</script>

<style>
.lds-ripple,
.lds-ripple div {
  box-sizing: border-box;
}
.lds-ripple {
  display: inline-block;
  position: relative;
  width: v-bind('props.width');
  height: v-bind('props.height');
}
.lds-ripple div {
  position: absolute;
  border: 4px solid currentColor;
  opacity: 1;
  border-radius: 100%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: calc(v-bind('props.height')/2);
    left: calc/borde(v-bind('props.width')/2);
    width: 8px;
    height: 8px;
    opacity: 0;
  }
  4.9% {
    top: calc(v-bind('props.height')/2);
    left: calc(v-bind('props.width')/2);
    width: 8px;
    height: 8px;
    opacity: 0;
  }
  5% {
    top: calc(v-bind('props.height')/2);
    left: calc(v-bind('props.width')/2);
    width: 8px;
    height: 8px;
    opacity: 1;
  }
  100% {
    top: 0;
    left: 0;
    width: v-bind('props.width');
    height: v-bind('props.height');
    opacity: 0;
  }
}
</style>