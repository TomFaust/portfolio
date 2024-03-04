export class History{

    forward = null;
    backward = null;

    backwardButton = null;
    forwardButton = null;

    screens = [];

    history = [];
    historyPos = 0;
    
    interactibles = [];
    holders = [];

    constructor(window,interactibles,attribute,holders,screens,action,init = null){
        this.forward = window.querySelector(".forward");
        this.backward = window.querySelector(".backward");

        this.forwardButton = this.forward.querySelector("button");
        this.backwardButton = this.backward.querySelector("button");

        this.interactibles = window.querySelectorAll(interactibles);
        this.holders = window.querySelectorAll(holders);

        this.screens = window.querySelectorAll(screens);

        if(init){
            this.history.push(init)
        }

        this.interactibles.forEach(interactible => {
            interactible.addEventListener(action,(e)=>{
                this.history = this.history.slice(0, this.historyPos + 1);

                this.history.push(eval("interactible."+ attribute));
                this.historyPos++;

                this.backwardButton.disabled = false;
                this.forwardButton.disabled = true;
            })
        })

        this.backward.addEventListener('click',()=>{
            this.Backward();
        })

        this.forward.addEventListener('click',()=>{
            this.Forward();
        })
    }

    Backward(){

        this.forwardButton.disabled = false;

        if(this.historyPos > 0){
            this.historyPos--;
            if(this.historyPos < 1){
                this.backwardButton.disabled = true;
            }else{
                this.backwardButton.disabled = false;
            }
        }
        this.switchSubject();
    }

    Forward(){

        this.backwardButton.disabled = false;

        if(this.historyPos < this.history.length - 1){
            this.historyPos++;
            if(this.historyPos == this.history.length - 1){
                this.forwardButton.disabled = true;
            }else{
                this.forwardButton.disabled = false;
            }
        }
        this.switchSubject();
    }

    switchSubject(){
        console.log(this.history);
        console.log(this.historyPos);

        this.holders.forEach(holder =>{
            holder.value = this.history[this.historyPos];
        })

        this.screens.forEach(screen => {
            console.log(this.screens)
            if(screen.dataset.subject == this.history[this.historyPos]){
                screen.classList.remove('d-none');
            }else{
                screen.classList.add('d-none');
            }

        })
    }
    

}