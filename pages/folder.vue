<template>
  <div>
    <div v-for="dat in data">
      <div class="p-2">
        <div v-if="dat.isFolder"><NuxtLink :to="`/users${dat.path}`"><Icon name="ph:folder-simple-duotone"></Icon>{{ dat.name }}</NuxtLink></div>
        <div v-else class="bg-orange-300"><NuxtLink :to="`/users${dat.path}`"><Icon name="ph:cards-duotone"></Icon>{{ dat.name }}</NuxtLink></div>
      </div>
    </div> 
  </div>
</template>

<script lang="ts" setup>

const data = [
  {name:"folder1", isFolder: true, path: "/test"},
  {name:"folder2", isFolder: true, path: "/test"},
  {name:"quiz1", isFolder: false, path: "/test2"},
  {name:"quiz2", isFolder: false, path: "/test3/test5"},
  ]
</script>

<style>
</style>