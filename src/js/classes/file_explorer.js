import { MaskIcon } from "./mask_icon.js";
import { DoubletapHandler } from "./doubletap_handler.js";

export class FileExplorer{

    tapedTwice = false;

    icons;
    panels;
    select;
    foldericons;
    programs;

    constructor(root){
        
        this.icons = root.querySelectorAll('.clickableIcon');
        this.panels = root.querySelectorAll('.folderPanel');
        this.select = root.querySelector('.address_select');
        this.folderIcons = root.querySelectorAll('.folderIcon');
        this.programs = root.querySelectorAll('.openingIcon');

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

                new DoubletapHandler(icon,() =>{this.swapPanels(icon)})

            })
            
            this.programs.forEach(program =>{
                program.addEventListener('dblclick', () =>{ window.open(program.dataset.url)  })
                new DoubletapHandler(program,() =>{ window.open(program.dataset.url) })
            })

            this.select.value = "main"
        }
        
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
