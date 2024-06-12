<template>
  <div ref="menu" class="menubar" @mousedown="(e) => {
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
        console.log(editorView)
        command(editorView!.state, editorView!.dispatch, editorView)
      }
    })


  }"></div>
  <div ref="view"></div>
</template>

<script lang="ts" setup>
import { EditorView } from "prosemirror-view"
import { EditorState, Plugin } from "prosemirror-state"
import {keymap} from "prosemirror-keymap"
import {baseKeymap} from "prosemirror-commands"
import {schema} from "prosemirror-schema-basic"


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

onMounted(() => {
  console.log('onMounted', menu.value)
  setTimeout
  const plugin = new Plugin({
    view(editorView) {
      menuView = new MenuView(props.items, editorView = editorView, menu.value!)
      editorView.dom.parentNode?.insertBefore(menuView.dom, editorView.dom)
      return menuView
    }
  })
  if(!view.value){
    return
  }
  editorView = new EditorView(view.value, {
    state: EditorState.create({
      schema: schema,
      plugins: [keymap(baseKeymap), plugin]
    })
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
        dom.style.display = active ? "" : "none"
      })
    }
  }
</script>

<style></style>