export class Tablist{

    tabs = [];
    pages = [];
    activeAttribute = null;

    constructor(tabWindow,tabIdentifier,pageIdentifier,activeAttribute = null){
        this.tabs = tabWindow.querySelectorAll(tabIdentifier);
        this.pages = tabWindow.querySelectorAll(pageIdentifier);
        this.activeAttribute = activeAttribute;

        this.tabs.forEach((tab) =>{
            tab.addEventListener('click', () =>{
                this.SwitchTab(tab)
            })
        })

        this.pages.forEach((page) =>{
            page.style.display = "none"
        })

        this.pages[0].style.display = "block"
        this.tabs[0].setAttribute(activeAttribute,'true')
    }

    SwitchTab(selectedTab){
        this.tabs.forEach((tab,key) => {
            if(tab == selectedTab){
                tab.setAttribute(this.activeAttribute,'true')
                this.pages[key].style.display = "block"
            }else{
                tab.setAttribute(this.activeAttribute,'false')
                this.pages[key].style.display = "none";
            }
        })
    }

}
