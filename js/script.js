let style = document.createElement("style")
document.getElementsByTagName("body")[0].appendChild(style)
createTab('welcome');
dragElement(document.getElementById("welcome_window"))

var myVar = setInterval(function() {
    myTimer();
  }, 1000);
  
  function myTimer() {
    var d = new Date();
    document.getElementById("clock").innerHTML = d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

let icons = document.getElementsByClassName("icon")

for (let index = 0; index < icons.length; index++) {
  if(icons[index].id){
    icons[index].addEventListener("click",openMe);
  }
}

document.getElementById("welcome_close").addEventListener("click",() => closeTab("welcome_tab","welcome_window"))
document.getElementById("welcome_ok").addEventListener("click",() => closeTab("welcome_tab","welcome_window"))

function openMe(event){

    let element = document.getElementById(event.target.closest("div").id + "_tab")

    if (element && document.getElementById(event.target.closest("div").id + "_window").style.display == "none"){

      toggleWindow(event.target.closest("div").id);

    } else if(!element){
        createTab(event.target.closest("div").id)
        createWindow(event.target.closest("div").id + "_tab")
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

function createWindow(windowName){

  let fileName = "pages/" + windowName.substring(0, windowName.length - 4) + ".html"

  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

          let tabName = windowName.substring(0, windowName.length - 4) + "_window"
          let window = document.createElement("div")
            
          window.id = tabName
          window.classList.add("window")
          window.classList.add("displayWindow")

          let titleBar = document.createElement("div")
          titleBar.classList.add("title-bar")
          titleBar.id = tabName + "header"

          let titleBarText = document.createElement("div")
          titleBarText.classList.add("title-bar-text")
          let name = windowName.substring(0, windowName.length - 4)
          titleBarText.innerHTML = name
          titleBar.appendChild(titleBarText)

          let titleBarControls = document.createElement("div")
          titleBarControls.classList.add("title-bar-controls")
          let minimize = document.createElement("button")
          minimize.setAttribute("aria-label","Minimize")
          minimize.addEventListener("click",() => toggleWindow(windowName.substring(0, windowName.length - 4)))

          let close = document.createElement("button")
          close.setAttribute("aria-label","Close")
          close.addEventListener("click", () => closeTab(windowName,tabName))

          titleBarControls.appendChild(minimize)
          titleBarControls.appendChild(close)
          titleBar.appendChild(titleBarControls) 
          window.appendChild(titleBar);

          let windowArea = document.createElement("div")
          windowArea.classList.add("windowArea")
          windowArea.insertAdjacentHTML('beforeend',this.responseText)
    
          window.addEventListener("click",clickTab)

          let height = "70"
          let width = "40"
          let aspect_ratio = "";

          switch(windowName.substring(0, windowName.length - 4)){
            case 'contact':
              height = "60"
              width = "40"
              break;
            case 'cv':
              height = "80"
              width = "50"
              aspect_ratio = " 1/1.41"
              break;
            case 'social_media':
              height = "60"
              width = "30"
              break;
            case 'about_me':
              height = "80"
              width = "60"
              break;
            case 'color_picker':
              height = "60"
              width = "30"
              break;
          }

          window.style.height = height + "%"
          window.style.width = width + "%"
          window.style.aspectRatio = aspect_ratio

          window.style.top = Math.floor(Math.random() * Math.floor(95 - height)) + "%"
          window.style.left = (5 + Math.floor(Math.random() * Math.floor(95 - width))) + "%"

          window.style.resize = "both"

          window.appendChild(windowArea)

          document.getElementById("container").appendChild(window)

          //add slideshow to about me
          if(windowName.substring(0, windowName.length - 4) == "about_me"){
            showSlides(slideIndex)
          }

          if(windowName.substring(0, windowName.length - 4) == "color_picker"){
            let sliders = document.getElementsByClassName("range")

            for (let index = 0; index < sliders.length; index++) {
              sliders[index].addEventListener("input",colorSlider)
            }

            let RGBNumbers = document.getElementsByClassName("RGBInput")

            for (let index = 0; index < RGBNumbers.length; index++) {
              RGBNumbers[index].addEventListener("input",colorInput)
            }

            document.getElementById("setColor").addEventListener("click",colorFromButton)
          }

          //set custom cursor for new window
          if(localStorage.hasOwnProperty("cursor")){
            switchCursors(localStorage.getItem("cursor"))
          }

          //make window dragable
          dragElement(window)
        }
      };

      
    xhttp.open("GET", fileName, true);
    xhttp.send();
}


function toggleWindow(windowName){

  let window = document.getElementById(windowName + "_window");
  let tab = document.getElementById(windowName + "_tab");

  if(window){

    if(window.style.display == "none"){
        //tab is closed, open it
      window.style.display = "inline";

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
    
    e.target.closest(".window").style.zIndex = 11
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


var slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  
}

let cursors = document.getElementsByClassName("cursorOptions")

for (let index = 0; index < cursors.length; index++) {
    cursors[index].addEventListener("click",fromMenu)
}

function fromMenu(event){
  switchCursors(event.target.closest("a").id)
}