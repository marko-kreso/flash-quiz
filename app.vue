<template>
  <main class="flex-col flex h-screen">
    <div class="h-16 sticky z-10 w-full top-0 flex-shrink-0 border-b flex flex-row items-center bg-white">
        <span class="text-blue-600 text-4xl pl-2">GigaQuiz</span>
        <div class="flex flex-1 flex-row justify-end">
          <button :class="['border', 'border-black', 'p-2', 'mr-3', 'rounded-md', ...buttonProperties]" @click="()=>edit=!edit">
            <IconListElement name="ph:pencil-duotone" text="Edit" />
          </button>
        </div>
    </div>
    <div class="flex-row flex flex-1 min-h-0">
      <div class="basis-48 flex flex-col border-r">
        <div class="flex-1">
          <nav class="h-full flex flex-col bg-white">counter
            <ul class="flex flex-col flex-1">
              <li class="flex flex-col justify-center h-12"><IconListElement name="ph:stack-duotone" text="Collection"/></li>
              <li class="flex flex-col justify-center h-12"><IconListElement name="ph:globe-simple-duotone" text="Explore"/></li>
            </ul>
            <ul class="flex flex-col justify-end flex-1">
              <li class="flex flex-col justify-center h-12"><IconListElement name="ph:question-duotone" text="About"/></li>
              <li class="flex flex-col justify-center h-12"><IconListElement name="ph:user-circle-duotone" text="Profile"/></li>
              <li class="flex flex-col justify-center h-12"><IconListElement name="ph:signpost-duotone" text="Logout"/></li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="flex-1 basis-11/12 flex-col overflow-scroll flex">
        <NuxtPage></NuxtPage>
      </div>
    </div>
    </main>
</template>
<script setup lang="ts">
const edit = useState('edit', ()=>false)
const buttonProperties = computed(()=>[edit.value ? 'bg-blue-600' : '', edit.value ? 'text-white':'', !edit.value ? 'edit':''])
</script>
<style>
  main{
    background-size: 60px 60px;
    background-image: linear-gradient(to right, theme('colors.gray.200') 1px, transparent 1px),
      linear-gradient(to bottom, theme('colors.gray.200') 1px, transparent 1px);
  }
  .edit:hover{
    background-color: orange;
  }
</style>
