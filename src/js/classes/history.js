import { DoubletapHandler } from "./doubletap_handler.js";

export class History{

    forward = null;
    backward = null;

    screens = [];

    history = [];
    historyPos = 0;
    
    interactibles = [];
    holders = [];

    constructor(window,interactibles,attribute,holders,screens,action,init = null){
        this.forward = window.querySelector(".forward");
        this.backward = window.querySelector(".backward");

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

                this.backward.disabled = false;
                this.forward.disabled = true;
            })

            if(action === "dblclick"){
                new DoubletapHandler(interactible, () =>{

                    this.history = this.history.slice(0, this.historyPos + 1);

                    this.history.push(eval("interactible."+ attribute));
                    this.historyPos++;
            
                    this.backward.disabled = false;
                    this.forward.disabled = true;

                })
            }
        })


        this.backward.addEventListener('click',()=>{
            this.Backward();
        })

        this.forward.addEventListener('click',()=>{
            this.Forward();
        })
    }

    Backward(){

        this.forward.disabled = false;

        if(this.historyPos > 0){
            this.historyPos--;
            if(this.historyPos < 1){
                this.backward.disabled = true;
            }else{
                this.backward.disabled = false;
            }
        }
        this.switchSubject();
    }

    Forward(){

        this.backward.disabled = false;

        if(this.historyPos < this.history.length - 1){
            this.historyPos++;
            if(this.historyPos == this.history.length - 1){
                this.forward.disabled = true;
            }else{
                this.forward.disabled = false;
            }
        }
        this.switchSubject();
    }

    switchSubject(){
        this.holders.forEach(holder =>{
            holder.value = this.history[this.historyPos];
        })

        this.screens.forEach(screen => {
            if(screen.dataset.subject == this.history[this.historyPos]){
                screen.classList.remove('d-none');
            }else{
                screen.classList.add('d-none');
            }
        })
    }
    

}