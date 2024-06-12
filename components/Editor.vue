<template>
    <div ref="test" id="undoIcon" class="hidden">
      <Icon  name="ph:arrow-arc-left-duotone"></Icon>
    </div>
    <MenuPlugin :items="[
      {command: toggleMark(schema.marks.strong), dom: icon('B', 'strong')},
      {command: toggleMark(schema.marks.em), dom: icon('i', 'em')},
      {command: undo, dom: undoIcon},
      {command: redo, dom: redoIcon},
      // {command: setBlockType(schema.nodes.paragraph), dom: icon('p', 'paragraph')},
      // {command: wrapIn(schema.nodes.blockquote), dom: icon('>', 'blockquote')},
      // heading(1), heading(2), heading(3),
    ]" ref="menu" id="test" >
    </MenuPlugin>
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
const menu = ref(null)
const  editView = ref(null)
const items = ref([

])
onMounted(()=>{
  // const vier = new EditorView(test.value, {
  //   state: model.value.state ? EditorState.fromJSON({
  //   schema: schema,
  //   plugins: exampleSetup({schema: schema})
  // }, model.value.state) : EditorState.create({schema}),
  //   dispatchTransaction(transaction){
  //     let newState = view.state.apply(transaction)
  //     view.updateState(newState)
  //     model.value.state = newState.toJSON()
  //     model.value.text = newState.doc.textBetween(0, newState.doc.nodeSize-2, ' ').replaceAll(/\s+/g,' ')
  //     console.log(model.value.state)
  //   } 

  // })

})


</script>

<style scoped>
.ProseMirror-textblock-dropdown {
  min-width: 3em;
}

.ProseMirror-menu {
  margin: 0 -4px;
  line-height: 1;
}

.ProseMirror-tooltip .ProseMirror-menu {
  width: -webkit-fit-content;
  width: fit-content;
  white-space: pre;
}

.ProseMirror-menuitem {
  margin-right: 3px;
  display: inline-block;
}

.ProseMirror-menuseparator {
  border-right: 1px solid #ddd;
  margin-right: 3px;
}

.ProseMirror-menu-dropdown, .ProseMirror-menu-dropdown-menu {
  font-size: 90%;
  white-space: nowrap;
}

.ProseMirror-menu-dropdown {
  vertical-align: 1px;
  cursor: pointer;
  position: relative;
  padding-right: 15px;
}

.ProseMirror-menu-dropdown-wrap {
  padding: 1px 0 1px 4px;
  display: inline-block;
  position: relative;
}

.ProseMirror-menu-dropdown:after {
  content: "";
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid currentColor;
  opacity: .6;
  position: absolute;
  right: 4px;
  top: calc(50% - 2px);
}

.ProseMirror-menu-dropdown-menu, .ProseMirror-menu-submenu {
  position: absolute;
  background: white;
  color: #666;
  border: 1px solid #aaa;
  padding: 2px;
}

.ProseMirror-menu-dropdown-menu {
  z-index: 15;
  min-width: 6em;
}

.ProseMirror-menu-dropdown-item {
  cursor: pointer;
  padding: 2px 8px 2px 4px;
}

.ProseMirror-menu-dropdown-item:hover {
  background: #f2f2f2;
}

.ProseMirror-menu-submenu-wrap {
  position: relative;
  margin-right: -4px;
}

.ProseMirror-menu-submenu-label:after {
  content: "";
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 4px solid currentColor;
  opacity: .6;
  position: absolute;
  right: 4px;
  top: calc(50% - 4px);
}

.ProseMirror-menu-submenu {
  display: none;
  min-width: 4em;
  left: 100%;
  top: -3px;
}

.ProseMirror-menu-active {
  background: #eee;
  border-radius: 4px;
}

.ProseMirror-menu-disabled {
  opacity: .3;
}

.ProseMirror-menu-submenu-wrap:hover .ProseMirror-menu-submenu, .ProseMirror-menu-submenu-wrap-active .ProseMirror-menu-submenu {
  display: block;
}

.ProseMirror-menubar {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  position: relative;
  min-height: 1em;
  color: #666;
  padding: 1px 6px;
  top: 0; left: 0; right: 0;
  border-bottom: 1px solid silver;
  background: white;
  z-index: 10;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  overflow: visible;
}

.ProseMirror-icon {
  display: inline-block;
  line-height: .8;
  vertical-align: -2px; /* Compensate for padding */
  padding: 2px 8px;
  cursor: pointer;
}

.ProseMirror-menu-disabled.ProseMirror-icon {
  cursor: default;
}

.ProseMirror-icon svg {
  fill: currentColor;
  height: 1em;
}

.ProseMirror-icon span {
  vertical-align: text-top;
}
.ProseMirror{
  background-color: black;
}
</style>