class GameObject {
    // Fields
    private _div: HTMLElement
    
    protected x : number = 0
    protected y : number = 0

    // properties
    public get div() : HTMLElement { return this._div }
    public get getX() : number { return this.x }
    public get getY() : number { return this.y }

    public getRectangle() : DOMRect {
        return this._div.getBoundingClientRect()
        // return this.hitbox.getBoundingClientRect()
    }

    constructor(tag : string) {
        this._div = document.createElement(tag)
        let level = document.getElementsByTagName("game")[0]!
        level.appendChild(this._div)
    }

}