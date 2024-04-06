import { ProgramWindow } from "./classes/program_window.js";
import { MaskIcon } from "./classes/mask_icon.js";

let iconContainer = document.querySelector('#desktopIcons');
let icons = iconContainer.querySelectorAll(".icon")

icons.forEach((icon)=>{
  
    let clickable = icon.querySelector('.clickable');
    
    if(clickable && clickable.id){
      clickable.addEventListener("dblclick",openMe);
      new MaskIcon(clickable);
    }

    clickable.addEventListener("touchstart", (e) =>{
      tapHandler(e,clickable)
    });
    
})

var tapedTwice = false;

function tapHandler(event,clickable) {
    if(!tapedTwice) {
        tapedTwice = true;
        setTimeout( function() { tapedTwice = false; }, 300 );
        return false;
    }
    event.preventDefault();

    //action on double tap goes below
    openMe(event);
}

if(!localStorage.hasOwnProperty('ok_welcome')){
  new ProgramWindow('welcome',(self) => {
    document.getElementById("welcome_ok").addEventListener("click",function(){
      self.closeTab()
      localStorage.setItem('ok_welcome',1)
    })
  })
}

function openMe(event){
    let element = document.getElementById(event.target.closest(".clickable").id + "_tab")
    let closestDiv = event.target.closest(".clickable");
    new ProgramWindow(
      closestDiv.id,
      "",
      closestDiv.dataset.window? closestDiv.dataset.window: undefined,
      closestDiv.dataset.windowIcon? closestDiv.dataset.windowIcon: undefined,
      closestDiv.dataset.canDuplicate? +closestDiv.dataset.canDuplicate: undefined
    )
}

