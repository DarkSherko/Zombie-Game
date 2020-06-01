class Game {
    
    private zombie: Zombie

    constructor() {
        this.zombie = new Zombie(0, 87, 83, 68, 65)
        this.gameLoop()
    }    

    private gameLoop(){
        this.zombie.update()
        requestAnimationFrame(() => this.gameLoop())
    }
}

window.addEventListener("load", () => new Game())