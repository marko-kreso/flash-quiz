<template>
  <div class="flex flex-1">
  <div ref="menu" class="menubar flex flex-row items-center gap-2" @mousedown="(e) => {
    e.preventDefault()
    console.log('HELLO')
    if (editorView === undefined) {
      return
    }
    editorView.focus()
    if(!menuView){
      return
    }
    console.log('HELLO')
    menuView.items.forEach(({ command, dom }) => {
      if (dom.contains(e.target)) {
        command(editorView!.state, editorView!.dispatch, editorView)
      }
    })


  }"></div>
  <div ref="view" class="flex flex-1 flex-col"></div>

  </div>
</template>

<script lang="ts" setup>
import { EditorView } from "prosemirror-view"
import { EditorState, Plugin, Transaction } from "prosemirror-state"
import {keymap} from "prosemirror-keymap"
import {baseKeymap} from "prosemirror-commands"
import {schema} from "prosemirror-schema-basic"
import {undo, redo, history} from "prosemirror-history"
import {toggleMark, setBlockType, wrapIn} from "prosemirror-commands"

const props = defineProps<
  {
    editorView: EditorView,
    items: Array<{ command: any, dom: any }>
  }
>()
const menu = ref<HTMLElement | undefined>(undefined)
const view = ref<HTMLElement | undefined>(undefined)

let editorView: EditorView | undefined = undefined
let menuView: undefined | MenuView = undefined
let bold = ref(false)
let italic = ref(false)

onMounted(() => {
  console.log('onMounted', menu.value)
  setTimeout
  const plugin = new Plugin({
    view(editorView) {
      menuView = new MenuView(props.items, editorView = editorView, menu.value!)
      editorView.dom.parentNode?.insertBefore(menuView.dom, editorView.dom)
      return menuView
    },
  })
  if(!view.value){
    return
  }
  editorView = new EditorView(view.value, {
    state: EditorState.create({
      schema: schema,
      plugins: [history(),keymap({"Mod-z":undo, "Mod-y":redo, "Mod-b":toggleMark(schema.marks.strong), "Mod-i":toggleMark(schema.marks.em)}),keymap(baseKeymap), plugin]
    }),
    dispatchTransaction(tr) {
      let newState =editorView.state.apply(tr) 
      console.log(newState.storedMarks)

      if(newState.storedMarks === null){
        bold.value=(newState.selection.$head.marks().map((m)=>m.type).includes(schema.marks.strong))
        italic.value=(newState.selection.$head.marks().map((m)=>m.type).includes(schema.marks.em))
      }else{
        bold.value = newState.storedMarks?.map((m)=>m.type).includes(schema.marks.strong)
        italic.value = newState.storedMarks?.map((m)=>m.type).includes(schema.marks.em)
      }

      if(newState.doc.childCount < 20){
        editorView?.updateState(newState)
      }
    },
  })


})
class MenuView {
    items: { command: any, dom: HTMLElement }[]
    editorView: EditorView
    dom: HTMLElement

    constructor(items: { command: any, dom: HTMLElement }[], editorView: EditorView, dom: HTMLElement) {
      this.items = items
      this.editorView = editorView
      this.dom = dom
      items.forEach(({command,dom})=>{
        console.log(dom)
        this.dom.appendChild(dom)
      })
      this.update()
    }

    destroy() {
      if (this.dom) {
        this.dom.remove()
      }
    }
    update() {
      this.items.forEach(({ command, dom }) => {
        let active = command(this.editorView.state, null, this.editorView.state)
        if(command === undo || command === redo){
          dom.style.fill = active ? "black": "gray"
        }else{
          dom.style.verticalAlign = "bottom"
        }
        if(dom.innerText === 'B'){
          console.log('active', dom, active)
          dom.style.backgroundColor = bold.value ? "#eee" : "white"
        }
        if(dom.innerText === "I"){
          dom.style.backgroundColor = italic.value ? "#eee" : "white"
        }
        // if(dom.innerText === "B"){
        //   dom.style.color = active ? "black": "gray"

        // }
        // dom.style.display = active ? "" : "none"
      })
    }
  }
</script>

<style>
.menubar{
  border-bottom: 1px solid black;
}
.ProseMirror{
  @apply flex-1 
}
</style>