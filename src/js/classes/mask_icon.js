export class MaskIcon{

    tapedTwice = false;
    clickable = null;
    initialColor = null;
    mask = null;

    constructor(clickable){

        this.clickable = clickable;

        this.createMask();

        this.clickable.addEventListener("dblclick",() => {this.removeMask()});
        this.clickable.addEventListener("click",() => {this.addMask()});
        document.addEventListener('click', (event) => {
            if (!this.clickable.contains(event.target)) {
              this.removeMask();
            }
        });
        this.clickable.addEventListener("touchstart", (e) => {this.tapHandler(e)});
        
    }

    tapHandler(event) {
        if(!this.tapedTwice) {
            this.tapedTwice = true;
            setTimeout( () => { this.tapedTwice = false; }, 300 );
            return false;
        }
        event.preventDefault();
        this.removeMask();
    }

    createMask(){
        this.mask = document.createElement("div");
        this.mask.classList.add('selectionEffect')

        let img = this.clickable.querySelector('img')

        if(img){
            let src = img.src;
            if(src){
                this.mask.style = "--icon-image: url(" + src + ")";
                img.parentNode.appendChild(this.mask)
            }
        }

    }


    addMask(){

        this.clickable.querySelector('.selectionEffect').style.display = "block";
        let label = this.clickable.querySelector('label');

        if(window.getComputedStyle(label).getPropertyValue("color") == null){
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