<template>
  <div>
    <div v-for="dat in data" class="flex flex-col text-2xl">
      <div class="flex flex-col justify-center">
        <NuxtLink class="hover:bg-gray-200" :to="`/users${dat.path}`" :noPrefetch="!dat.isFolder">
          <div v-if="dat.isFolder"><IconListElement class="align-bottom flex items-center" name="ph:folder-simple-duotone" :size="iconSize" :text="dat.name"></IconListElement></div>
          <div v-else><IconListElement class="align-bottom flex items-center" name="ph:cards-duotone" :size="iconSize" :text="dat.name"></IconListElement></div>
        </NuxtLink>
      </div>
    </div> 
  </div>
</template>

<script lang="ts" setup>

const data = [
  {name:"folder1", isFolder: true, path: "/test"},
  {name:"folder2", isFolder: true, path: "/test"},
  {name:"item1", isFolder: false, path: "/test2"},
  {name:"item2", isFolder: false, path: "/test3/test5"},
  {name:"folder1", isFolder: true, path: "/test"},
  {name:"folder2", isFolder: true, path: "/test"},
  {name:"item1", isFolder: false, path: "/test2"},
  {name:"item2", isFolder: false, path: "/test3/test5"},
  {name:"folder1", isFolder: true, path: "/test"},
  {name:"folder2", isFolder: true, path: "/test"},
  {name:"item1", isFolder: false, path: "/test2"},
  {name:"item2", isFolder: false, path: "/test3/test5"},
  ]
const iconSize = "2rem"
const itemFontSize="2rem"
</script>

<style>

main{
  background-image: none;
}
</style>