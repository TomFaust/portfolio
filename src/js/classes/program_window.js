import { BrowserSwitch } from "./browser_windows.js";
import { History } from "./history.js";
import { Tablist } from "./tablist.js";
import { FileExplorer } from "./file_explorer.js";
import { InteractiveTable } from "./interactive_table.js";
import { Search } from "./search.js";

export class ProgramWindow{

    tab = null;
    windowDiv = null;
    pos1 = 0; pos2 = 0; pos3 = 0; pos4 = 0;

    constructor(id,done = null,layoutName = 'default',windowIcon = null, canDuplicate = 0){

        let existingTab = document.getElementById(id + "_tab");
        let existingWindow = document.getElementById(id + "_window");


        if (existingWindow && existingTab && !canDuplicate){
            if(existingWindow.style.display == "none"){
                this.toggleWindow(existingWindow,existingTab);
            }else{
                this.setOnTop(existingWindow)
            }
        }else{
            this.tab = document.createElement('div');
            this.windowDiv = document.createElement('div');

            this.createTab(id,windowIcon)
            this.createWindow(id,done, layoutName,windowIcon)
            this.setOnTop()
        }
    }

    createTab(tab_id,windowIcon){
        this.tab.classList.add("window")
        this.tab.id = tab_id + "_tab"
        this.tab.classList.add("tab")
        this.tab.classList.add("openTab")
        this.tab.classList.add("title-bar")
        this.tab.addEventListener("click",() => this.toggleWindow())

        if(windowIcon){
            let icon = document.createElement("img")
            icon.src = "assets/icons/" + windowIcon;
            this.tab.appendChild(icon)
        }
        this.tab.innerHTML += "<span>" + tab_id + "</span>"
        
        document.getElementsByTagName("tabs")[0].appendChild(this.tab)
    }

    createWindow(target,done,layoutName = "default",windowIcon){

        layoutName = "../templates/layouts/" + layoutName + ".php";
        
      
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
        
                let titleBar = self.windowDiv.querySelector('.title-bar')

                if(windowIcon){
                    let titleBarIcon = self.windowDiv.querySelector(".title-bar-icon");
                    titleBarIcon.src = "../assets/icons/" + windowIcon;
                }
        
                let titleBarText = self.windowDiv.querySelector(".title-bar-text")
                let name = windowName.substring(0, windowName.length - 4)
                titleBarText.innerHTML += name
        
                //title bar controls
                let minimize = self.windowDiv.querySelector(".controls-minimize")
                minimize.addEventListener("click",() => self.toggleWindow())

                let close = self.windowDiv.querySelector(".controls-close")
                close.addEventListener("click", () => self.closeTab())

                let maximize = self.windowDiv.querySelector(".controls-maximize")
                if(maximize){
                    maximize.addEventListener("click", () => self.maximizeWindow(maximize))
                }
                
                self.windowDiv.addEventListener("click",(e) =>{
                    self.setOnTop()
                })

                document.getElementById("container").appendChild(self.windowDiv)
        
                var randomPercentage = Math.floor(Math.random() * 100) + 1;
                var topPosition = (window.innerHeight - self. windowDiv.clientHeight) * (randomPercentage / 100);
                self.windowDiv.style.top = (topPosition / window.innerHeight * 100) + "%";
        
                randomPercentage = Math.floor(Math.random() * 100);
                var leftPosition = (window.innerWidth - self.windowDiv.clientWidth) * (randomPercentage / 100);
                self.windowDiv.style.left = leftPosition / window.innerWidth * 100 + "%";
        
                //make window dragable
                self.dragElement(self.windowDiv,titleBar,self)
                switch(target){
                    case "social_media":
                        new BrowserSwitch(self.windowDiv);
                        new History(self.windowDiv,".address_select","value",".address_select",".browser_screen","change","linkedin");
                        break;
                    case "my_properties":
                        new Tablist(self.windowDiv,'li[role="tab"]','div.window-body','aria-selected')
                        break;
                    case "past_work":
                        new History(self.windowDiv,".clickableIcon","dataset.panel",".address_select",".folderPanel","dblclick","main");
                        new FileExplorer(self.windowDiv);
                        break;
                    case "contact":
                        new InteractiveTable(self.windowDiv)
                        new Tablist(self.windowDiv,'li.contantGroup','div.contacts')
                        new Search(['social','direct'],{ valueNames: ['name','link','quick']},"#searchContacts")
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

    toggleWindow(existingWindow = null, existingTab = null){
        let windowDiv = this.windowDiv;
        let tab = this.tab;

        if(existingWindow && existingTab){
            windowDiv = existingWindow;
            tab = existingTab;
        }

        if(windowDiv.style.display == "none"){
            windowDiv.style.display = ""; 
            tab.classList.remove("closedTab");
            tab.classList.add("openTab");

            this.setOnTop(windowDiv)
        }else{
            //tab is open, close it
            windowDiv.style.display = "none";
            tab.classList.remove("openTab");
            tab.classList.add("closedTab");
        }  
    }

    setOnTop(targetWindow = null){

        let windowDiv = this.windowDiv
        if(targetWindow){
            windowDiv = targetWindow
        }

        let parent = windowDiv.parentNode;

        let windows = Array.from(document.getElementsByClassName("displayWindow"))
        windows.sort((a, b) => {
            const zIndexA = parseInt(window.getComputedStyle(a).zIndex);
            const zIndexB = parseInt(window.getComputedStyle(b).zIndex);
            return zIndexA - zIndexB;
        });

        for (let index = 0; index < windows.length; index++) {
            windows[index].style.zIndex = index;
            let titleBar = windows[index].querySelector('.title-bar')
            if(titleBar){
                titleBar.classList.add("inactive");
            }
        }

        windowDiv.style.zIndex = windows.length;
        let titleBar = windowDiv.querySelector('.title-bar')
        if(titleBar){
            titleBar.classList.remove("inactive");
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

    
    dragElement(elmnt,titleBar,self) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        // Mouse event listeners
        titleBar.onmousedown = dragMouseDown;

        // Touch event listeners
        titleBar.addEventListener("touchstart", touchstartHandler, { passive: false });

        function dragMouseDown(e) {
            self.setOnTop();
            if (!e.target.closest('.maximized') && !e.target.closest(".title-bar-controls")) {
                e = e || window.event;
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
            }
        }

        function touchstartHandler(e) {
            self.setOnTop();
            if (!e.target.closest('.maximized') && !e.target.closest(".title-bar-controls")) {
                var touch = e.changedTouches[0];
                pos3 = touch.clientX;
                pos4 = touch.clientY;
                document.addEventListener("touchend", touchendHandler, { passive: false });
                document.addEventListener("touchmove", touchmoveHandler, { passive: false });
            }
        }

        function touchmoveHandler(e) {
            e.preventDefault();

            var touch = e.changedTouches[0];

            // Get the dimensions of the container
            var containerWidth = elmnt.parentElement.clientWidth;
            var containerHeight = elmnt.parentElement.clientHeight;

            // Calculate the new cursor position
            pos1 = pos3 - touch.clientX;
            pos2 = pos4 - touch.clientY;
            pos3 = touch.clientX;
            pos4 = touch.clientY;

            // Calculate the new position in percentages
            var topPercentage = ((elmnt.offsetTop - pos2) / containerHeight) * 100;
            var leftPercentage = ((elmnt.offsetLeft - pos1) / containerWidth) * 100;

            // Set the element's new position
            elmnt.style.top = topPercentage + "%";
            elmnt.style.left = leftPercentage + "%";
        }

        function touchendHandler() {
            document.removeEventListener("touchend", touchendHandler);
            document.removeEventListener("touchmove", touchmoveHandler);
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