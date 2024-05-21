<template>
    <div class="flex-row flex h-screen">
      <div class="basis-48 flex flex-col">
        <div class="bg-blue-300 flex basis-32"></div>
        <div class="bg-orange-300 flex-1"></div>
      </div>
      <div class="flex-1 basis-11/12 flex-col overflow-scroll">
        <div class="h-16 bg-slate-300 sticky z-10 w-full top-0">
          title
        </div>
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
</template>
