class Grid {
    // Fields
    private columns : number    = 12
    private rows    : number    = 7
    public bricks = new Array()

    constructor() {
        let game = document.getElementsByTagName("game")[0]
        
        let brick
        console.log("Grid created!")

        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                brick = document.createElement('brick')
                game.appendChild(brick)
                this.bricks.push(brick)

                brick.style.transform = `translate(${column * 64 + 260}px,${row * 32 + 70}px)`      
            } 
        }
    }
}