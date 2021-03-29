class Game {
    // Fields    
    private paddle: Paddle;
    private ball : Ball;
    private grid : Grid;

    private score : number 
    private scoreElement: HTMLElement

    private lives : number = 3
    private livesElement: HTMLElement

    constructor() {
        let game = document.getElementsByTagName('game')[0]

        this.scoreElement = document.createElement("score")
        this.scoreElement.innerHTML = "Bricks left: 0"

        this.livesElement = document.createElement("lives")
        this.livesElement.innerHTML = "Lives: 3"

        game.appendChild(this.scoreElement)
        game.appendChild(this.livesElement)

        this.ball = new Ball(this)
        this.grid = new Grid
        this.score = this.grid.bricks.length

            
        this.paddle = new Paddle(0, 65, 68)
        this.gameLoop()
    }

    private gameLoop() : void {

        
            this.ball.update()

            this.checkBallBounce(this.ball)
            if (this.checkCollision(this.ball.getRectangle(), this.paddle.getRectangle())) {     
                this.ball.bounceY()
            }

            for (const block of this.grid.bricks) {

                if (this.checkCollision(this.ball.getRectangle(), block.getBoundingClientRect())) {     
                     block.remove()
                     this.ball.bounceY()
                     this.addPoint()
                }
            }

        this.paddle.update()

        requestAnimationFrame(() => this.gameLoop()) 
    }

    private checkBallBounce(ball : Ball) {
        // Top
         if(ball.getY < 0) {
             ball.bounceY()
         }
         // left
         else if(ball.getX < 0) {
             ball.bounceX()
         }

         // right
         else if(ball.getX + ball.div.clientWidth > window.innerWidth) {
            ball.bounceX()
        }

        // right
        else if(ball.getY + ball.div.clientHeight > window.innerHeight) {
            this.loseLife()
            this.reset()
        }
     }

 
     private checkCollision(a: ClientRect, b: ClientRect) : boolean {
         return (a.left <= b.right &&
             b.left <= a.right &&
             a.top <= b.bottom &&
             b.top <= a.bottom)
      }

    private addPoint() : void {

        if(this.lives > 0){
            this.score--
            this.scoreElement.innerHTML = "Bricks left: "+this.score
        }
    }

    private loseLife() : void{
        this.lives--
        this.livesElement.innerHTML = "Lives: "+this.lives
        if(this.lives <= 0){
            this.scoreElement.innerHTML = "Bricks left: You lose"
        }
    }

    private reset() : void{
        document.getElementsByTagName('paddle')[0].remove()
        document.getElementsByTagName('ball')[0].remove()
        this.paddle = new Paddle(0, 65, 68)
        this.ball = new Ball(this)
    }

} 

window.addEventListener("load", () => new Game())