<template>
    <div contenteditable="true" @input="(event)=>{
        console.log(event.target.innerText)
        model = event.target.innerText
    }">
        {{ model }}
    </div>
</template>



<script setup>

const model = defineModel({required: true})
console.log(model.value)

</script>