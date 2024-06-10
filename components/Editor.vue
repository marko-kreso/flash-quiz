<template>
    <div contenteditable="true" @input="(event)=>{
        model = event.target.innerText
        console.log(model)
        curPose = getCaretPosition(event.target)
        target = event.target
    }">
        {{ model }}
    </div>
</template>



<script setup>

const model = defineModel({required: true})
const curPose = ref(0)
const target = ref(null)
watch(model, ()=>{
    setPos(target, curPose.value)
})
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