import { ProgramWindow } from "./program_window.js";

export class WelcomeFeatures{

    constructor(){
        let buttons = document.querySelectorAll(".exploreButton")
        buttons[0].addEventListener('click',()=>{})
        buttons[1].addEventListener('click',this.openContact)
        buttons[2].addEventListener('click',this.openAll)
        buttons[4].addEventListener('click',()=>{})
    }

    openAll(){
        let iconContainer = document.querySelector('#desktopIcons');
        let icons = iconContainer.querySelectorAll(".icon")

        icons.forEach((icon,index)=>{

            setTimeout(()=>{
                let clickable = icon.querySelector('.clickable');
                new ProgramWindow(
                    clickable.id,
                    "",
                    clickable.dataset.window? clickable.dataset.window: undefined,
                    clickable.dataset.windowIcon? clickable.dataset.windowIcon: undefined,
                    clickable.dataset.canDuplicate? +clickable.dataset.canDuplicate: undefined
                )
            }, index * 100);

        })
    }

    openContact(){

        let icon = document.querySelector('#contact')

        var event = new MouseEvent('dblclick', {
            'view': window,
            'bubbles': true,
            'cancelable': true
          });

        icon.dispatchEvent(event);

    }
}