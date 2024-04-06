export class MaskIcon{

    tapedTwice = false;
    clickable = null;
    initialColor = null;

    constructor(clickable){

        this.clickable = clickable

        this.clickable.addEventListener("dblclick",() => {this.removeMask()});
        this.clickable.addEventListener("click",() => {this.addMask()})  
        document.addEventListener('click', (event) => {
            if (!this.clickable.contains(event.target)) {
              this.removeMask()
            }
        });
        this.clickable.addEventListener("touchstart", () => {this.tapHandler});
    }

    tapHandler(event) {
        if(!tapedTwice) {
            this.tapedTwice = true;
            setTimeout( function() { tapedTwice = false; }, 300 );
            return false;
        }
        event.preventDefault();
        removeMask()
    }


    addMask(){

        this.clickable.querySelector('.selectionEffect').style.display = "block";
        let label = this.clickable.querySelector('label');

        if(window.getComputedStyle(label).getPropertyValue("color") !== "rgb(255, 255, 255)"){
            this.initialColor = window.getComputedStyle(label).getPropertyValue("color");
        }

        label.style.background = "navy";
        label.style.borderColor = "white";
        label.style.color = "white";
  
    }
      
    removeMask(){
        this.clickable.querySelector('.selectionEffect').style.display = "none";
        let label = this.clickable.querySelector('label');
        label.style.background = "";
        label.style.borderColor = "transparent";
        label.style.color = this.initialColor
    }

}