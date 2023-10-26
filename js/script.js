let style = document.createElement("style")
document.getElementsByTagName("body")[0].appendChild(style)

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

if(!localStorage.hasOwnProperty('ok_welcome')){
  createTab('welcome');
  createWindow('welcome',"","",function(){
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
        createWindow(closestDiv.id,closestDiv.dataset.height,closestDiv.dataset.width,"",closestDiv.dataset.window)
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

function createWindow(target,height,width,done,layoutName = "default"){

  layoutName = "pages/layouts/" + layoutName + ".html";

  var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

        let windowDiv = document.createElement('div');
        windowDiv.innerHTML = this.responseText;
        windowDiv = windowDiv.childNodes[0];
        let windowArea = windowDiv.getElementsByClassName("windowArea")[0];

        let windowName = target + "_tab"
        let fileName = "pages/" + target + ".html"

        var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
              if (this.readyState == 4 && this.status == 200) {

                let tabName = windowName.substring(0, windowName.length - 4) + "_window"

                windowDiv.id = tabName

                let titleBar = windowDiv.getElementsByClassName('title-bar')[0]
                titleBar.id = tabName + "header"

                let titleBarText = windowDiv.getElementsByClassName("title-bar-text")[0]
                let name = windowName.substring(0, windowName.length - 4)
                titleBarText.innerHTML += name

                let minimize = windowDiv.getElementsByClassName("controls-minimize")[0]
                minimize.addEventListener("click",() => toggleWindow(target))

                let close = windowDiv.getElementsByClassName("controls-close")[0]
                close.addEventListener("click", () => closeTab(windowName,tabName))

                windowArea.insertAdjacentHTML('beforeend',this.responseText)
          
                windowDiv.addEventListener("click",clickTab)
                windowDiv.style.height = height + "px"
                windowDiv.style.width = width + "px"

                let top = Math.floor(Math.random() * (window.innerHeight - height)) - 30
                if(top < 0){
                  top = top * -1
                }

                windowDiv.style.top = top + "px"
                windowDiv.style.left = Math.floor(Math.random() * (window.innerWidth - width)) + "px"

                windowDiv.appendChild(windowArea)

                document.getElementById("container").appendChild(windowDiv)

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
                dragElement(windowDiv)
                if(done){
                  done();
                }
              }
            };  
          xhttp.open("GET", fileName, true);
          xhttp.send();
      }
    };  
  xhttp.open("GET", layoutName, true);
  xhttp.send();
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
