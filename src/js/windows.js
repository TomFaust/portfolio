import { ProgramWindow } from "./classes/program_window.js";
import { MaskIcon } from "./classes/mask_icon.js";
import { DoubletapHandler } from "./classes/doubletap_handler.js";

let iconContainer = document.querySelector('#desktopIcons');
let icons = iconContainer.querySelectorAll(".icon")

icons.forEach((icon)=>{
  
    let clickable = icon.querySelector('.clickable');
    
    if(clickable && clickable.id){
      clickable.addEventListener("dblclick", () => {openMe(clickable)});
      new DoubletapHandler(clickable,()=>{ openMe(clickable); })
      new MaskIcon(clickable);
    }
})

if(!localStorage.hasOwnProperty('ok_welcome')){
  new ProgramWindow('welcome',(self) => {
    let showEachTime = document.getElementById('showEachTime');
    document.getElementById("welcome_ok").addEventListener("click",function(){
      self.closeTab()
      if(!showEachTime.checked){
        localStorage.setItem('ok_welcome',1)
      }
    })
  })
}

function openMe(clickable){
  let element = document.getElementById(clickable.closest(".clickable").id + "_tab")
  let closestDiv = clickable.closest(".clickable");
  new ProgramWindow(
    closestDiv.id,
    "",
    closestDiv.dataset.window? closestDiv.dataset.window: undefined,
    closestDiv.dataset.windowIcon? closestDiv.dataset.windowIcon: undefined,
    closestDiv.dataset.canDuplicate? +closestDiv.dataset.canDuplicate: undefined
  )
}

