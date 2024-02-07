export class History{

    forward = null;
    backward = null;
    history = [];

    constructor(window,element,action){
        this.forward = window.querySelector(".forward");
        this.backward = window.querySelector(".backward");

        if(this.forward && this.backward){
            this.backward.addEventListener('click',()=>{
                console.log('back');
            })

            this.forward.addEventListener('click',()=>{
                console.log('forward');
            })
        }
    }
}