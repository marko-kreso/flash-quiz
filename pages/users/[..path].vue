<template>
  <div v-if="pageType === PageType.loading">
    <div class="lds-ripple"><div></div><div></div></div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const path = route.params.path
const folderFetch = await useFetch(`/api/cards/folder?path=${path}`)
const cardFetch = await useFetch(`/api/cards/cards?path=${path}`)

enum PageType {
  folder,
  cards,
  loading,
  failed
}
const pageType = computed(()=>{
  if(folderFetch.status.value === 'success'){
    return PageType.cards
  }
  if(cardFetch.status.value === 'success'){
    return PageType.folder
  }
  if(folderFetch.pending || cardFetch.pending){
    return PageType.loading
  }
  return PageType.failed
})
watch(pageType, (value)=>{
  if(value === PageType.failed){
    throw createError({
      statusCode:cardFetch.error.value?.statusCode ,
      statusMessage: cardFetch.error.value?.message,
      fatal: true
    })
  }
})


</script>

<style>
.lds-ring,
.lds-ring div {
  box-sizing: border-box;
}
.lds-ring {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid currentColor;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: currentColor transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>