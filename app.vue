<template>
  <main class="flex-col flex h-screen">
    <div class="h-16 sticky z-10 w-full top-0 flex-shrink-0 border-b flex flex-row items-center bg-white">
        <span class="text-blue-600 text-4xl pl-2">Test</span>
        <div class="flex flex-1 flex-row justify-end">
          <DropDown :selected="true" v-if="!edit" :elements="mapKeys" v-model="activeView">
            <template #toggler>
              <button  :class="['border', 'border-black', 'p-2', 'mr-3', 'rounded-md', ...buttonProperties]">
                <IconListElement :name="layoutIcon" :text="activeView" />
              </button>
            </template>
          </DropDown>
          <button v-if="loggedIn" :class="['border', 'border-black', 'p-2', 'mr-3', 'rounded-md', ...buttonProperties]" @click="()=>edit=!edit">
            <IconListElement name="ph:pencil-duotone" text="Edit" />
          </button>
        </div>
    </div>
    <div class="flex-row flex flex-1 min-h-0">
      <div class="basis-48 flex flex-col border-r">
        <div class="flex-1">
          <nav class="h-full flex flex-col bg-white">
            <ul class="flex flex-col flex-1">
              <li  class="flex flex-col justify-center h-12"><IconListElement name="ph:sign-in-duotone" text="Login"/></li>
              <li  class="flex flex-col justify-center h-12"><IconListElement name="ph:arrow-square-up-right-duotone" text="Sign Up"/></li>
              <!-- <li class="flex flex-row align-center justify-evenly mb-1"><button class="rounded-md bg-blue-400 px-3 py-2">Log in</button> <button class="rounded-md bg-orange-400 px-3 py-2">Sign up</button></li> -->
              <li v-if="loggedIn" class="flex flex-col justify-center h-12"><IconListElement name="ph:stack-duotone" text="Collection"/></li>
              <li class="flex flex-col justify-center h-12"><IconListElement name="ph:globe-simple-duotone" text="Explore"/></li>
            </ul>
            <ul class="flex flex-col justify-end flex-1">
              <li class="flex flex-col justify-center h-12"><IconListElement name="ph:question-duotone" text="About"/></li>
              <li v-if="loggedIn" class="flex flex-col justify-center h-12"><IconListElement name="ph:user-circle-duotone" text="Profile"/></li>
              <li v-if="loggedIn" class="flex flex-col justify-center h-12"><IconListElement name="ph:signpost-duotone" text="Logout"/></li>
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

const loggedIn = useCookie('session')
const edit = useState('edit', ()=>false)
const activeView = useState('activeView', ()=>View.List)
const buttonProperties = computed(()=>[edit.value ? 'bg-blue-600' : '', edit.value ? 'text-white':'', !edit.value ? 'edit':''])

enum View{
  List = "List",
  SideBySide = "Side-By-Side",
  Carousel = "Carousel",
}

const viewMap: Map<View, string> = new Map([
  [View.List, "ph:list-numbers-duotone"],
  [View.SideBySide, "ph:square-split-horizontal-duotone"],
  [View.Carousel, "ph:caret-double-right-duotone"],
])
const mapKeys: ComputedRef<string[]> = computed(()=>[...viewMap.keys()].map((k)=>k.toString()))
const layoutIcon = computed(()=>viewMap.get(activeView.value))

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
