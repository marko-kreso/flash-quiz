<template>
    <div ref="test" id="test" class="inline" contenteditable="true" style="white-space: pre-wrap;" @input="(event)=>{
        model = event.target.innerHTML
        // model =model.replace('hello 1', '<b>hello 1</b>')
    }" v-html="model">
    </div>
</template>



<script setup>

const model = defineModel({required: true})
// const test = ref(null)

// watch(test,()=>{
//     console.log(test.value)
// })

function setPos(el, pos){
    var range = document.createRange()
    var sel = window.getSelection()
    
    console.log(pos)
    range.setStart(el.childNodes[0], pos )
    range.collapse(true)
    
    sel.removeAllRanges()
    sel.addRange(range)
}

function getCaretPosition(editableDiv) {
  var caretPos = 0,
    sel, range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      if (range.commonAncestorContainer.parentNode == editableDiv) {
        caretPos = range.endOffset;
      }
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    if (range.parentElement() == editableDiv) {
      var tempEl = document.createElement("span");
      editableDiv.insertBefore(tempEl, editableDiv.firstChild);
      var tempRange = range.duplicate();
      tempRange.moveToElementText(tempEl);
      tempRange.setEndPoint("EndToEnd", range);
      caretPos = tempRange.text.length;
    }
  }
  return caretPos;
}

</script>