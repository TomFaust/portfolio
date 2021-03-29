/// <reference path="gameobject.ts" />

class Paddle extends GameObject{


    private leftkey: number = 0
    private rightkey: number = 0

    private leftSpeed: number = 0
    private rightSpeed: number = 0

    constructor(x : number, leftKey : number, rightKey : number) {
        super('paddle')

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.div)

        this.leftkey   = leftKey // w
        this.rightkey = rightKey // s

        if(x != 0) x -= this.div.clientWidth
        this.x = 600
        this.y = 500

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }


    private onKeyDown(e: KeyboardEvent): void {
        // Hiermee kan je checken welke keycode achter een bepaalde toets zit. 
        console.log(e.keyCode)

        switch (e.keyCode) {
            case this.leftkey:
                this.leftSpeed = 7
                break
            case this.rightkey:
                this.rightSpeed = 7
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.leftkey:
                this.leftSpeed = 0
                break
            case this.rightkey:
                this.rightSpeed = 0
                break
        }
    }

    public update() {
        let newX = this.x - this.leftSpeed + this.rightSpeed

        // check of de paddle binnen beeld blijft
        if (newX > 0 && newX + 100 < window.innerWidth) this.x = newX

        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

}