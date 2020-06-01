class Ball {
    // Fields 
    private _div: HTMLElement
    
    private _x: number = 0
    private _y: number = 0
    
    
    private xspeed : number = 0
    private yspeed : number = 0
    
    // Properties
    public get x(): number          { return this._x }
    public get y(): number          { return this._y }
    public get div(): HTMLElement   { return this._div}

    public getRectangle() {
        return this.div.getBoundingClientRect()
    }

    constructor() {
        this._div = document.createElement("ball")

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this._div)

        this._x = Math.random() * window.innerWidth
        this._y = Math.random() * window.innerHeight

        this.xspeed = -5
        this.yspeed = -3

    }
    
    public update() : void {
        this._x += this.xspeed
        this._y += this.yspeed

        this._div.style.transform = `translate(${this._x}px, ${this._y}px)`
    }

    public bounceX(){
        this.xspeed *= -1
        this.xspeed *= 1.5
    }

    public bounceY() {
        this.yspeed *= -1
    }
}