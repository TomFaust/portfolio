import { BrowserSwitch } from "./browser_windows.js";
import { History } from "./history.js";
import { Tablist } from "./tablist.js";
import { FileExplorer } from "./file_explorer.js";

export class ProgramWindow{

    tab = null;
    windowDiv = null;
    pos1 = 0; pos2 = 0; pos3 = 0; pos4 = 0;

    constructor(id,done = null,layoutName = 'default'){
        this.tab = document.createElement('div');
        this.windowDiv = document.createElement('div');

        this.createTab(id)
        this.createWindow(id,done, layoutName)
    }

    createTab(tab_id){
        this.tab.classList.add("window")
        this.tab.id = tab_id + "_tab"
        this.tab.classList.add("tab")
        this.tab.classList.add("openTab")
        this.tab.classList.add("title-bar")
        this.tab.addEventListener("click",() => this.toggleWindow())
      
        let close = document.createElement("button")
        close.setAttribute("aria-label","Close")
        close.addEventListener("click",() => this.closeTab())
        
        let div = document.createElement("div")
        div.classList.add("title-bar-controls")
        div.appendChild(close)
      
        this.tab.innerHTML += "<span>" + tab_id + "</span>"
        this.tab.appendChild(div)
        
        document.getElementsByTagName("tabs")[0].appendChild(this.tab)
    }

    createWindow(target,done = null,layoutName = "default"){

        layoutName = "templates/layouts/" + layoutName + ".php";
      
        var self = this;

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
        
                self.windowDiv.innerHTML = this.responseText;
                self.windowDiv = self.windowDiv.childNodes[0];
        
                let windowArea = self.windowDiv.getElementsByClassName("windowArea")[0];
                let windowName = target + "_tab"
                let fileName = "pages/" + target + ".html"
                let tabName = windowName.substring(0, windowName.length - 4) + "_window"
        
                self.windowDiv.id = tabName
        
                let titleBar = self.windowDiv.getElementsByClassName('title-bar')[0]
                titleBar.id = tabName + "header"
        
                let titleBarText = self.windowDiv.getElementsByClassName("title-bar-text")[0]
                let name = windowName.substring(0, windowName.length - 4)
                titleBarText.innerHTML += name
        
                //title bar controls
                let minimize = self.windowDiv.getElementsByClassName("controls-minimize")[0]
                minimize.addEventListener("click",() => self.toggleWindow())

                let close = self.windowDiv.getElementsByClassName("controls-close")[0]
                close.addEventListener("click", () => self.closeTab())

                let maximize = self.windowDiv.getElementsByClassName("controls-maximize")[0]
                if(maximize){
                    maximize.addEventListener("click", () => self.maximizeWindow(maximize))
                }
                
                self.windowDiv.addEventListener("click",self.clickTab)
                document.getElementById("container").appendChild(self.windowDiv)
        
                var randomPercentage = Math.floor(Math.random() * 100) + 1;
                var topPosition = (window.innerHeight - self. windowDiv.clientHeight) * (randomPercentage / 100);
                self.windowDiv.style.top = (topPosition / window.innerHeight * 100) + "%";
        
                randomPercentage = Math.floor(Math.random() * 100);
                var leftPosition = (window.innerWidth - self.windowDiv.clientWidth) * (randomPercentage / 100);
                self.windowDiv.style.left = leftPosition / window.innerWidth * 100 + "%";
        
                //make window dragable
                self.dragElement(self.windowDiv)
                switch(target){
                case "social_media":
                    new BrowserSwitch(self.windowDiv);
                    new History(self.windowDiv,".address_select","value",".address_select",".browser_screen","change","linkedin");
                    break;
                case "my_properties":
                    new Tablist(self.windowDiv)
                    break;
                case "past_work":
                    new History(self.windowDiv,".clickableIcon","dataset.panel",".address_select",".folderPanel","click","main");
                    new FileExplorer(self.windowDiv);
                    break;
                }
        
                if(done){
                    done(self);
                }     
            }
        };  
        xhttp.open("POST", layoutName, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("content=" + target);
      }
      

      
    maximizeWindow(target){

        let bar = this.windowDiv.getElementsByClassName('title-bar')[0]
    
        if(bar.classList.contains("maximized")){
        
            bar.classList.remove("maximized");
        
            this.windowDiv.style.width = this.windowDiv.dataset.width;
            this.windowDiv.style.height = this.windowDiv.dataset.height;
            this.windowDiv.style.top = this.windowDiv.dataset.top;
            this.windowDiv.style.left = this.windowDiv.dataset.left;
            this.windowDiv.style.padding = this.windowDiv.dataset.padding
            this.windowDiv.style.resize = "both";
        
            target.ariaLabel = "Maximize";
        
        }else{
            bar.classList.add("maximized");
        
            this.windowDiv.dataset.width = this.windowDiv.style.width;
            this.windowDiv.dataset.height = this.windowDiv.style.height;
            this.windowDiv.dataset.top = this.windowDiv.style.top;
            this.windowDiv.dataset.left = this.windowDiv.style.left;
            this.windowDiv.dataset.padding = this.windowDiv.style.padding
        
            this.windowDiv.style.resize = "none";
        
            this.windowDiv.style.width = "100%";
            this.windowDiv.style.height = "100%";
            this.windowDiv.style.top = 0;
            this.windowDiv.style.left = 0;
            this.windowDiv.style.padding = 0;
        
            target.ariaLabel = "Restore";
        
        }
    
    }

    toggleWindow(){
      
        if(this.windowDiv.style.display == "none"){

            //tab is closed, open it
            this.windowDiv.style.display = "";

            //position window above all others
            let windows = document.getElementsByClassName("displayWindow")
            for (let index = 0; index < windows.length; index++) {
                windows[index].style.zIndex = 10;
            }

            this.windowDiv.style.zIndex  = 11;
            this.tab.classList.remove("closedTab");
            this.tab.classList.add("openTab");
        }else{
            //tab is open, close it
            this.windowDiv.style.display = "none";
            this.tab.classList.remove("openTab");
            this.tab.classList.add("closedTab");
        }
        
    }

    closeTab(){
        this.tab.remove()
        this.windowDiv.remove()
    }

    clickTab(e){
        let windows = document.getElementsByClassName("displayWindow")
      
        for (let index = 0; index < windows.length; index++) {
            windows[index].style.zIndex = 10
        }
        
        e.target.closest(".window").style.zIndex = 11
    }

    
    dragElement(elmnt) {

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
    
}