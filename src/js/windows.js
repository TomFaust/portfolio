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
  new ProgramWindow(
    'welcome',
    (self) => {
      let showEachTime = document.getElementById('showEachTime');
      document.getElementById("welcome_ok").addEventListener("click",function(){
        self.closeTab()
        if(!showEachTime.checked){
          localStorage.setItem('ok_welcome',1)
        }
      })
    },
    "default",
    "windows-0.png",
    0,
    0,
    0,
  )
}

function openMe(clickable){
  new ProgramWindow(
    clickable.id,
    "",
    clickable.dataset.window? clickable.dataset.window: undefined,
    clickable.dataset.windowIcon? clickable.dataset.windowIcon: undefined,
    clickable.dataset.canDuplicate? +clickable.dataset.canDuplicate: undefined
  )
}

