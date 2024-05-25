<template>
    <div>
        <div class="flex flex-row justify-center">
            <template v-for="tab in props.tabs">
            <div  class="flex-1 text-center" @click="()=>{
                active=tab
                console.log('hello', 'tab', tab, 'active',active) 
                }">{{ tab }}</div> 
            </template>
        </div>
        <br>
        <hr>
        <br>
        <template v-for="tab in props.tabs">
            <slot v-if="active === tab" :name="tab"></slot>
        </template>
    </div>
</template>
<script setup lang="ts">
const props = defineProps(['tabs'])
console.log(props.tabs)
const active = ref(props.tabs[0])
</script>