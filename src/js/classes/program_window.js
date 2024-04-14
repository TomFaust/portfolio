import { BrowserSwitch } from "./browser_windows.js";
import { History } from "./history.js";
import { Tablist } from "./tablist.js";
import { FileExplorer } from "./file_explorer.js";
import { InteractiveTable } from "./interactive_table.js";
import { Search } from "./search.js";
import { WelcomeFeatures } from "./welcome_features.js";

export class ProgramWindow{

    tab = null;
    windowDiv = null;
    pos1 = 0; pos2 = 0; pos3 = 0; pos4 = 0;
    canMinimize;
    canMaximize;

    constructor(id, done = null, layoutName = 'default', windowIcon = null, canDuplicate = 0, canMinimize = 1, canMaximize = 1, placeRandom = 1){

        //create each window and tab first, so they can be referenced anywhere in the class
        let existingTab = document.getElementById(id + "_tab");
        let existingWindow = document.getElementById(id + "_window");

        //some windows should not have these options
        this.canMaximize = canMaximize
        this.canMinimize = canMinimize

        //some windows can have multiple instances for authenticity
        //if duplication is not allowed, attempt to open the already active window
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
        //create the tab and add necessary classes
        this.tab.classList.add("window")
        this.tab.id = tab_id + "_tab"
        this.tab.classList.add("tab")
        this.tab.classList.add("openTab")
        this.tab.classList.add("title-bar")

        //prevent minimizing by clicking the tab if needed
        if(this.canMinimize){
            this.tab.addEventListener("click",() => this.toggleWindow())
        }

        //add an icon to the tab if it was provided
        if(windowIcon){
            let icon = document.createElement("img")
            icon.src = "assets/icons/" + windowIcon;
            this.tab.appendChild(icon)
        }
        this.tab.innerHTML += "<span>" + tab_id + "</span>"
        
        document.getElementById("tabs").appendChild(this.tab)
    }

    createWindow(target,done,layoutName = "default",windowIcon){

        layoutName = "templates/layouts/" + layoutName + ".php";

        var self = this;

        //Make a get reguest to the layout of the window which includes the name of the content file
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
                    titleBarIcon.src = "assets/icons/" + windowIcon;
                }
        
                let titleBarText = self.windowDiv.querySelector(".title-bar-text")
                let name = windowName.substring(0, windowName.length - 4)
                titleBarText.innerHTML += name
        
                //check if miniminze is enabled, remove the button if its not
                let minimize = self.windowDiv.querySelector(".controls-minimize")
                if(self.canMinimize){
                    minimize.addEventListener("click",() => self.toggleWindow())
                }else{
                    minimize.remove()
                }

                //close is always enabled
                let close = self.windowDiv.querySelector(".controls-close")
                close.addEventListener("click", () => self.closeTab())

                //check if maximize is enabled, remove the button if its not
                let maximize = self.windowDiv.querySelector(".controls-maximize")
                if(self.canMaximize){
                    if(maximize){
                        maximize.addEventListener("click", () => self.maximizeWindow(maximize))
                    }
                }else{
                    maximize.remove()
                }
                
                //place the window on top of all other windows if its clicked anywhere
                self.windowDiv.addEventListener("click",(e) =>{
                    self.setOnTop()
                })

                //add the created window onto the page
                document.getElementById("container").appendChild(self.windowDiv)
        


                let randomPercentage = Math.floor(Math.random() * 100) + 1;
                let topPosition = (window.innerHeight - self.windowDiv.clientHeight) * (randomPercentage / 100);
                self.windowDiv.style.top = (topPosition / window.innerHeight * 100) + "%";
        
                randomPercentage = Math.floor(Math.random() * 100);
                let leftPosition = (window.innerWidth - self.windowDiv.clientWidth) * (randomPercentage / 100);
                self.windowDiv.style.left = leftPosition / window.innerWidth * 100 + "%";
        


                //make window dragable
                self.dragElement(self.windowDiv,titleBar,self)

                //window specific functions
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
                    case "welcome": 
                        new WelcomeFeatures()
                        break;
                }
        
                if(done){
                    done(self);
                }     
            }
        };  
        xhttp.open("GET", layoutName + "?content=" + target, true);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send();
    }
        
    maximizeWindow(target){

        //get the titlebar of the window
        let bar = this.windowDiv.getElementsByClassName('title-bar')[0]
    
        //check if its maximized
        if(bar.classList.contains("maximized")){
        
            //make it regular again
            bar.classList.remove("maximized");
        
            this.windowDiv.style.width = this.windowDiv.dataset.width;
            this.windowDiv.style.height = this.windowDiv.dataset.height;
            this.windowDiv.style.top = this.windowDiv.dataset.top;
            this.windowDiv.style.left = this.windowDiv.dataset.left;
            this.windowDiv.style.padding = this.windowDiv.dataset.padding
            this.windowDiv.style.resize = "both";
        
            target.ariaLabel = "Maximize";
        
        }else{

            //make it maximized
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

        //take the current window and tab as default
        let windowDiv = this.windowDiv;
        let tab = this.tab;

        //in case a window can be duplicated this entiee class only exists to set the already open window on top
        if(existingWindow && existingTab){
            windowDiv = existingWindow;
            tab = existingTab;
        }

        //if the window is not currently displated
        if(windowDiv.style.display == "none"){
            windowDiv.style.display = ""; 
            tab.classList.remove("closedTab");
            tab.classList.add("openTab");

            this.setOnTop(windowDiv)
        }else{
            //if the window is displayed
            windowDiv.style.display = "none";
            tab.classList.remove("openTab");
            tab.classList.add("closedTab");
        }  
    }

    //takes an open window and makes it the one with the highest zIndex
    setOnTop(targetWindow = null){

        //again, if a window cannot be duplicated and an instance already exists, this class just puts that window on top
        let windowDiv = this.windowDiv
        if(targetWindow){
            windowDiv = targetWindow
        }

        //get all active display windows
        let windows = Array.from(document.getElementsByClassName("displayWindow"))

        //sort them by their zIndex
        windows.sort((a, b) => {
            const zIndexA = parseInt(window.getComputedStyle(a).zIndex);
            const zIndexB = parseInt(window.getComputedStyle(b).zIndex);
            return zIndexA - zIndexB;
        });

        //set the zIndex of each element is sequence, in case they had none
        for (let index = 0; index < windows.length; index++) {
            windows[index].style.zIndex = index;

            //make the title bar of each window inactive
            let titleBar = windows[index].querySelector('.title-bar')
            if(titleBar){
                titleBar.classList.add("inactive");
            }
        }

        //give the current window a zIndex higher than any and set its title bar to active
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