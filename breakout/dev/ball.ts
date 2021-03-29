/// <reference path="gameobject.ts" />

class Ball extends GameObject{
    // Fields 
    
    private level : Game
    private xspeed : number = 0
    private yspeed : number = 0
    

    constructor(level: Game) {
        super('ball')

        this.level = level

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.div)

        this.x = 600
        this.y = 450

        this.xspeed = Math.floor(Math.random()*7) - 3

        if(this.xspeed == 0){
            this.xspeed = 1
        }

        this.yspeed = -7

    }

    
    public update() : void {

        this.x += this.xspeed
        this.y += this.yspeed

        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
        
    }

    public bounceX(){
        this.xspeed *= -1
    }

    public bounceY() {
        this.yspeed *= -1
    }
}