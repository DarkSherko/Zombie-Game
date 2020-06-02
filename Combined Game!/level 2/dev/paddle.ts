class Paddle {

    private div: HTMLElement
    private x: number
    private y: number

    private downkey: number = 0
    private upkey: number = 0
    private leftkey: number = 0
    private rightkey: number = 0


    private downSpeed: number = 0
    private upSpeed: number = 0
    private leftSpeed: number = 0
    private rightSpeed: number = 0

    constructor(x : number, upKey : number, downKey : number, leftKey : number, rightKey : number) {
        this.div = document.createElement("paddle")

        let game = document.getElementsByTagName("game")[0]
        game.appendChild(this.div)

        // w = 87, s = 83, up = 38, down = 40
        this.upkey   = upKey // w
        this.downkey = downKey // s
        this.leftkey = leftKey
        this.rightkey = rightKey


        if(x != 0) x -= this.div.clientWidth
        this.x = x
        this.y = 400

        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    public getRectangle() : ClientRect {
        return this.div.getBoundingClientRect()
    }

    private onKeyDown(e: KeyboardEvent): void {
        // Hiermee kan je checken welke keycode achter een bepaalde toets zit. 
        console.log(e.keyCode)

        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 5
                break
            case this.downkey:
                this.downSpeed = 5
                break
            case this.leftkey:
                this.leftSpeed = 5
                 break
            case this.rightkey:
                this.rightSpeed = 5
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0
                break
            case this.downkey:
                this.downSpeed = 0
                break
            case this.leftkey:
                    this.leftSpeed = 0
                break
            case this.rightkey:
                    this.rightSpeed = 0
                break
        }
    }

    public update() {
        let newY = this.y - this.upSpeed + this.downSpeed + this.leftSpeed +this.rightSpeed

        // check of de paddle binnen beeld blijft
        if (newY > 0 && newY + 100 < window.innerHeight) this.y = newY

        this.div.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

}