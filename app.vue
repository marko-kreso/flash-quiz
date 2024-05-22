<template>
  <div class="flex-col flex h-screen">
    <div class="h-16 bg-slate-300 sticky z-10 w-full top-0 flex-shrink-0">
      title
    </div>
    <div class="flex-row flex flex-1 min-h-0">
      <div class="basis-48 flex flex-col">
        <div class="bg-orange-300 flex-1">
          <nav class="h-full flex flex-col">
            <ul class="flex flex-col flex-1">
              <li class="flex flex-col justify-center h-12"><IconListElement name="ph:stack-duotone" text="Collection"/></li>
              <li class="flex flex-col justify-center h-12"><IconListElement name="ph:globe-simple-duotone" text="Explore"/></li>
            </ul>
            <ul class="flex flex-col justify-end flex-1">
              <li class="flex flex-col justify-center h-12"><IconListElement name="ph:user-circle-duotone" text="Profile"/></li>
              <li class="flex flex-col justify-center h-12"><IconListElement name="ph:signpost-duotone" text="Logout"/></li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="flex-1 basis-11/12 flex-col overflow-scroll flex">
        <div class="bg-slate-50">
          <CardList id="hello" url="https://test.com" v-slot="slotprops">
            <QuizCard>
              <template #front>hello: {{slotprops.item.front}}</template>
              <template #back>{{slotprops.item.back}}</template>
            </QuizCard>
          </CardList>
        </div>
      </div>
    </div>
    </div>
</template>
