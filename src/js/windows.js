import { ProgramWindow } from "./classes/program_window.js";

let iconContainer = document.querySelector('#desktopIcons');
let icons = iconContainer.querySelectorAll(".icon")

icons.forEach((icon)=>{
    let clickable = icon.getElementsByClassName('clickable')[0];
    if(clickable && clickable.id){
      
      clickable.addEventListener("dblclick",function(event){
        openMe(event);
        removeMask(clickable)
      });

      clickable.addEventListener("touchstart", (e) =>{
        tapHandler(e,clickable)
      });

      clickable.addEventListener("click",function(){
        addMask(clickable)
      })  

      document.addEventListener('click', function(event) {
        // Remove the highlight class from the element if the click is outside of it
        if (!clickable.contains(event.target)) {
          removeMask(clickable)
        }
      });

    }
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
    removeMask(clickable)
 }

function addMask(clickable){
  clickable.getElementsByClassName('selectionEffect')[0].style.display = "block";
        
  let label = clickable.getElementsByTagName('label')[0];
  label.style.background = "navy";
  label.style.borderColor = "white";
}

function removeMask(clickable){
  clickable.getElementsByClassName('selectionEffect')[0].style.display = "none";
  let label = clickable.getElementsByTagName('label')[0];
  label.style.background = "";
  label.style.borderColor = "transparent";
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

    new ProgramWindow(closestDiv.id,"",closestDiv.dataset.window)
}

