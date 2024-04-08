import { MaskIcon } from "./mask_icon.js";

export class FileExplorer{

    tapedTwice = false;

    icons;
    panels;
    select;
    foldericons;

    constructor(root){
        
        this.icons = root.querySelectorAll('.clickableIcon');
        this.panels = root.querySelectorAll('.folderPanel');
        this.select = root.querySelector('.address_select');
        this.folderIcons = root.querySelectorAll('.folderIcon');

        this.folderIcons.forEach(folderIcon =>{
            new MaskIcon(folderIcon)
        })

        if(this.icons && this.panels){
            let option = document.createElement('option');
                option.innerText = "C:/portfolio/past_work/";
                option.value = "main";
                this.select.appendChild(option);

            this.icons.forEach(icon =>{

                let option = document.createElement('option');
                option.innerText = "C:/portfolio/past_work/" + icon.dataset.panel;
                option.value = icon.dataset.panel;
                this.select.appendChild(option);

                icon.addEventListener('dblclick',(e)=>{
                    this.swapPanels(icon)
                },true);

                icon.addEventListener("touchstart", (e) => {this.tapHandler(e,icon)});
                
            })

            this.select.value = "main"
        }
        
    }

    tapHandler(event,icon) {
        if(!this.tapedTwice) {
            this.tapedTwice = true;
            setTimeout( () => { this.tapedTwice = false; }, 300 );
            return false;
        }
        event.preventDefault();
        this.swapPanels(icon)
    }

    swapPanels(icon){
        this.panels.forEach(panel => {
            if(panel.dataset.subject === icon.dataset.panel){
                this.select.value = icon.dataset.panel;
                panel.classList.remove('d-none');
            }else{
                panel.classList.add('d-none');
            }
        })
    }
}
