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
        command(editorView!.state, editorView!.dispatch, editorView)
      }
    })


  }"></div>
  <div ref="view" class="flex-1"></div>
</template>

<script lang="ts" setup>
import { EditorView } from "prosemirror-view"
import { EditorState, Plugin } from "prosemirror-state"
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
      plugins: [history(),keymap({"Mod-z":undo, "Mod-y":redo, "Mod-b":toggleMark(schema.marks.strong)}),keymap(baseKeymap), plugin]
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
        }
        // if(dom.innerText === "B"){
        //   dom.style.color = active ? "black": "gray"

        // }
        // dom.style.display = active ? "" : "none"
      })
    }
  }
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

.menubar {
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