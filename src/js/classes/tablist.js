export class Tablist{

    tabs = [];
    pages = [];

    constructor(tabWindow){
        this.tabs = tabWindow.querySelectorAll('li[role="tab"]');
        this.pages = tabWindow.querySelectorAll('div.window-body');

        this.tabs[0].setAttribute('aria-selected','true')
        this.pages[0].style.display = "block"

        this.tabs.forEach((tab) =>{
            tab.addEventListener('click', () =>{
                this.SwitchTab(tab)
            })
        })
    }

    SwitchTab(selectedTab){
        this.tabs.forEach((tab,key) => {
            if(tab == selectedTab){
                tab.setAttribute('aria-selected','true')
                this.pages[key].style.display = "block"
            }else{
                tab.setAttribute('aria-selected','false')
                this.pages[key].style.display = "none";
            }
        })
    }

}
