export class history{

    forward = null;
    backward = null;
    history = [];

    constructor(window,element,action){
        this.forward = window.querySelector(".forward");
        this.backward = window.querySelector(".backward");

        console.log(window.querySelector(".backward"));

        this.backward.addEventListener('click',()=>{
            console.log('back');
        })

        this.forward.addEventListener('click',()=>{
            console.log('forward');
        })
    }

}