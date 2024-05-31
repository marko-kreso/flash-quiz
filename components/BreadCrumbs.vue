<template>
  <div class="flex gap-1 font-bold">
    <!-- <div v-for="slot,i in $slots.default()">
      {{h('div')}}
    </div> -->
    <!-- {{ h(useSlots().default()[0]) }} -->
    <test></test>
  </div>
</template>

<script lang="ts" setup>
import { Comment, Fragment } from 'vue';
import BreadCrumb from './BreadCrumb.vue';
import type { VNode } from 'vue';

 const props=defineProps({
  sep: String
 })
//  const test = console.log(useSlots().default()[0])
console.log(useSlots().default())
console.log(useSlots().default()[0].children[0].type === BreadCrumb)
console.log(Comment.toString())
console.log(Fragment === Fragment)
let nodes = []

console.log('starting')
useSlots().default().forEach((e:VNode)=>{
  if(e.type === Fragment){
    nodes = [...nodes, ...e.children]
  }
  if(e.type === BreadCrumb){
    nodes.push(e)
  }
})

let finalRender = []
nodes.forEach((node,i)=>{
  finalRender.push(node)
  if(i !== nodes.length-1){
    finalRender.push(` ${props.sep} `)
  }
})

const test = h('div', finalRender)

</script>

<style>

</style>