<template>
    <div>
    <div ref="test" id="undoIcon" class="hidden">
      <Icon  name="ph:arrow-arc-left-duotone"></Icon>
    </div>
    <MenuPlugin :items="[
      {command: toggleMark(schema.marks.strong), dom: icon('B', 'strong')},
      {command: toggleMark(schema.marks.em), dom: icon('I', 'em')},
      {command: undo, dom: undoIcon},
      {command: redo, dom: redoIcon},
      // {command: setBlockType(schema.nodes.paragraph), dom: icon('p', 'paragraph')},
      // {command: wrapIn(schema.nodes.blockquote), dom: icon('>', 'blockquote')},
      // heading(1), heading(2), heading(3),
    ]" ref="menu" class="" v-model="model">

    </MenuPlugin>

    </div>
</template>



<script setup>

import {EditorState, Plugin} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {Schema, DOMParser, DOMSerializer} from "prosemirror-model"
import {schema} from "prosemirror-schema-basic"
import {exampleSetup} from "prosemirror-example-setup"
import {toggleMark, setBlockType, wrapIn} from "prosemirror-commands"
import {undo, redo, history} from "prosemirror-history"
// const undoSvg = document.createElement("span")
// undoSvg.innerHTML=document.querySelector('#undoIcon').innerHTML
const test = ref(null)
const undoIcon = computed(()=>{
  let out = document.createElement('span')
  out.innerHTML ='<svg style="display: inline;" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><g><path d="M80 56v96l-48-48Z" opacity=".2"/><path d="M128 96H88V56a8 8 0 0 0-13.66-5.66l-48 48a8 8 0 0 0 0 11.32l48 48A8 8 0 0 0 88 152v-40h40a88.1 88.1 0 0 1 88 88a8 8 0 0 0 16 0A104.11 104.11 0 0 0 128 96m-56 36.69L43.31 104L72 75.31Z"/></g></svg>' 
  return out
})
const redoIcon = computed(()=>{
  let out = document.createElement('span')
  out.innerHTML ='<svg style="display: inline;" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><g><path d="m224 104l-48 48V56Z" opacity=".2"/><path d="m229.66 98.34l-48-48A8 8 0 0 0 168 56v40h-40A104.11 104.11 0 0 0 24 200a8 8 0 0 0 16 0a88.1 88.1 0 0 1 88-88h40v40a8 8 0 0 0 13.66 5.66l48-48a8 8 0 0 0 0-11.32M184 132.69V75.31L212.69 104Z"/></g></svg>' 
  return out
})
function icon(text, name) {
  let span = document.createElement("span")
  span.className = "text-3xl menuicon " + name
  span.title = name
  span.textContent = text
  if(name === 'em'){
    span.style.fontStyle = 'italic'
  }
  if(name === 'em' || name === "strong"){
    span.style.fontFamily = 'bold'
  }
  return span
}

// Create an icon for a heading at the given level
function heading(level) {
  return {
    command: setBlockType(schema.nodes.heading, {level}),
    dom: icon("H" + level, "heading")
  }
}

const model = defineModel({required: true})
console.log('model', model.value.text)


</script>

<style scoped>
</style>