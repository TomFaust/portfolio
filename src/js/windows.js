import { BrowserSwitch } from "./classes/browser_windows.js";
import { History } from "./classes/history.js";
import { Tablist } from "./classes/tablist.js";
import { FileExplorer } from "./classes/file_explorer.js";

let iconContainer = document.querySelector('#desktopIcons');
let icons = iconContainer.querySelectorAll(".icon")

icons.forEach((icon)=>{
    let clickable = icon.getElementsByClassName('clickable')[0];
    if(clickable && clickable.id){
      clickable.addEventListener("click",openMe);
    }
})

if(!localStorage.hasOwnProperty('ok_welcome')){
  createTab('welcome');
  createWindow('welcome',function(){
      document.getElementById("welcome_ok").addEventListener("click",function(){
      closeTab("welcome_tab","welcome_window")
      localStorage.setItem('ok_welcome',1)
    })
  })
}

function openMe(event){
    let element = document.getElementById(event.target.closest("div").id + "_tab")
    let closestDiv = event.target.closest("div");

    if (element && document.getElementById(closestDiv.id + "_window").style.display == "none"){
      toggleWindow(closestDiv.id);
    } else if(!element){
        createTab(closestDiv.id)
        createWindow(closestDiv.id,"",closestDiv.dataset.window)
    }
}

function createTab(tab_id){
  let tab = document.createElement("div")
  tab.classList.add("window")
  tab.id = tab_id + "_tab"
  tab.classList.add("tab")
  tab.classList.add("openTab")
  tab.classList.add("title-bar")
  tab.addEventListener("click",() => toggleWindow(tab_id))

  let close = document.createElement("button")
  close.setAttribute("aria-label","Close")
  close.addEventListener("click",() => closeTab(tab_id + "_tab", tab_id + "_window"))
  
  let div = document.createElement("div")
  div.classList.add("title-bar-controls")
  div.appendChild(close)

  tab.innerHTML += "<span>" + tab_id + "</span>"
  tab.appendChild(div)
  
  document.getElementsByTagName("tabs")[0].appendChild(tab)
}

function createWindow(target,done = null,layoutName = "default"){

  layoutName = "templates/layouts/" + layoutName + ".php";

  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

        let windowDiv = document.createElement('div');
        windowDiv.innerHTML = this.responseText;
        windowDiv = windowDiv.childNodes[0];

        let windowArea = windowDiv.getElementsByClassName("windowArea")[0];
        let windowName = target + "_tab"
        let fileName = "pages/" + target + ".html"
        let tabName = windowName.substring(0, windowName.length - 4) + "_window"

        windowDiv.id = tabName

        let titleBar = windowDiv.getElementsByClassName('title-bar')[0]
        titleBar.id = tabName + "header"

        let titleBarText = windowDiv.getElementsByClassName("title-bar-text")[0]
        let name = windowName.substring(0, windowName.length - 4)
        titleBarText.innerHTML += name

        //title bar controls
        let minimize = windowDiv.getElementsByClassName("controls-minimize")[0]
        minimize.addEventListener("click",() => toggleWindow(target))
        let close = windowDiv.getElementsByClassName("controls-close")[0]
        close.addEventListener("click", () => closeTab(windowName,tabName))
        let maximize = windowDiv.getElementsByClassName("controls-maximize")[0]
        if(maximize){
          maximize.addEventListener("click", () => maximizeWindow(maximize,target))
        }
        
        windowDiv.addEventListener("click",clickTab)
        document.getElementById("container").appendChild(windowDiv)

        var randomPercentage = Math.floor(Math.random() * 100) + 1;
        var topPosition = (window.innerHeight - windowDiv.clientHeight) * (randomPercentage / 100);
        windowDiv.style.top = (topPosition / window.innerHeight * 100) + "%";

        randomPercentage = Math.floor(Math.random() * 100);
        var leftPosition = (window.innerWidth - windowDiv.clientWidth) * (randomPercentage / 100);
        windowDiv.style.left = leftPosition / window.innerWidth * 100 + "%";

        //make window dragable
        dragElement(windowDiv)
        switch(target){
          case "social_media":
            new BrowserSwitch(windowDiv);
            new History(windowDiv,".address_select","value",".address_select",".browser_screen","change","linkedin");
            break;
          case "my_properties":
            new Tablist(windowDiv)
            break;
          case "past_work":
            new History(windowDiv,".clickableIcon","dataset.panel",".address_select",".folderPanel","click","main");
            new FileExplorer(windowDiv);
            break;
        }

        if(done){
          done();
        }     

      }
    };  
  xhttp.open("POST", layoutName, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("content=" + target);
}

function maximizeWindow(target,windowName){

  let window = document.getElementById(windowName + "_window");
  let bar = window.getElementsByClassName('title-bar')[0]

  if(bar.classList.contains("maximized")){

    bar.classList.remove("maximized");

    window.style.width = window.dataset.width;
    window.style.height = window.dataset.height;
    window.style.top = window.dataset.top;
    window.style.left = window.dataset.left;
    window.style.padding = window.dataset.padding
    window.style.resize = "both";

    target.ariaLabel = "Maximize";

  }else{
    bar.classList.add("maximized");

    window.dataset.width = window.style.width;
    window.dataset.height = window.style.height;
    window.dataset.top = window.style.top;
    window.dataset.left = window.style.left;
    window.dataset.padding = window.style.padding

    window.style.resize = "none";

    window.style.width = "100%";
    window.style.height = "100%";
    window.style.top = 0;
    window.style.left = 0;
    window.style.padding = 0;

    target.ariaLabel = "Restore";

  }

}

function toggleWindow(windowName){

  let window = document.getElementById(windowName + "_window");
  let tab = document.getElementById(windowName + "_tab");

  if(window){

    if(window.style.display == "none"){
        //tab is closed, open it
      window.style.display = "";

      let windows = document.getElementsByClassName("displayWindow")

      for (let index = 0; index < windows.length; index++) {
        windows[index].style.zIndex = 10;
      }

      window.style.zIndex  = 11;

      tab.classList.remove("closedTab");
      tab.classList.add("openTab");
        

    }else{
        //tab is open, close it
        window.style.display = "none";
        
        tab.classList.remove("openTab");
        tab.classList.add("closedTab");
    }
  }

}

function closeTab(tab,window){

  if(document.getElementById(tab)){
    document.getElementById(tab).remove()
  }
  if(document.getElementById(window)){
    document.getElementById(window).remove()
  }  
    
}

function clickTab(e){
  let windows = document.getElementsByClassName("displayWindow")

    for (let index = 0; index < windows.length; index++) {
      windows[index].style.zIndex = 10
    }
    
    e.target.closest(".window").style.zIndex = 11
}


function dragElement(elmnt) {

  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {

    if(!e.target.classList.contains('maximized')){
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;

      let windows = document.getElementsByClassName("displayWindow")

      for (let index = 0; index < windows.length; index++) {
        windows[index].style.zIndex = 10
      }
      
      e.target.closest(".window").style.zIndex = 11;
    }
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    // Get the dimensions of the container
    var containerWidth = elmnt.parentElement.clientWidth;
    var containerHeight = elmnt.parentElement.clientHeight;

    // Calculate the new cursor position
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    // Calculate the new position in percentages
    var topPercentage = ((elmnt.offsetTop - pos2) / containerHeight) * 100;
    var leftPercentage = ((elmnt.offsetLeft - pos1) / containerWidth) * 100;

    // Set the element's new position
    elmnt.style.top = topPercentage + "%";
    elmnt.style.left = leftPercentage + "%";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
  
}