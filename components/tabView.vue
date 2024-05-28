<template>
    <div>
        <div class="flex flex-row justify-center tab">
            <template v-for="{name, text} in props.tabs">
                <div class="flex-1 p-2 m-1 hover:cursor-pointer">
                    <div  :class="['text-center', active===name ? 'active text-blue-600' : '']" @click="()=>{
                        active=name
                        console.log('hello', 'name', tab, 'active',active) 
                        }">{{ text }}</div> 

                        </div>
            </template>
        </div>
        <hr>
        <br>
        <template v-for="{name} in props.tabs">
            <slot v-if="active === name" :name="name"></slot>
        </template>
    </div>
</template>
<script setup lang="ts">
const props = defineProps(['tabs'])
console.log(props.tabs)
const active = ref(props.tabs[0].name)
</script>
<style>
    .tab div:not(:first-child){
      border-left: 1px solid black;
      /* background-color: black; */
    }
    .active{
        font-weight: bold;
    }
</style>