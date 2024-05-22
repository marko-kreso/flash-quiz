<template>
  <main class="flex-col flex h-screen">
    <div class="h-16 sticky z-10 w-full top-0 flex-shrink-0 border-b flex flex-row items-center bg-white">
        <span class="text-blue-600 text-4xl pl-2">QuizMore</span>
        <div class="flex flex-1 flex-row justify-end">
          <div class="border border-black p-2 mr-3 rounded-md">
            <IconListElement name="ph:pencil-duotone" text="Edit" />
          </div>
        </div>
    </div>
    <div class="flex-row flex flex-1 min-h-0">
      <div class="basis-48 flex flex-col border-r">
        <div class="flex-1">
          <nav class="h-full flex flex-col bg-white">
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
        <div>
          <CardList id="hello" url="https://test.com" v-slot="slotprops">
            <QuizCard class="mb-2 border-2 border-slate-400 rounded-md min-h-64">
              <template #front>hello: {{slotprops.item.front}}</template>
              <template #back>{{slotprops.item.back}}</template>
            </QuizCard>
          </CardList>
        </div>
      </div>
    </div>
    </main>
</template>
<style>
  main{
    background-size: 60px 60px;
    background-image: linear-gradient(to right, theme('colors.gray.200') 1px, transparent 1px),
      linear-gradient(to bottom, theme('colors.gray.200') 1px, transparent 1px);
  }
</style>
