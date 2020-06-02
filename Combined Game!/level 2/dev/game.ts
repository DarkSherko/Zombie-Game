class Game {
    
    private balls : Ball[] = []
    private paddle : Paddle
    private paddle2 : Paddle
    private score : number = 0
    private score2 : number = 0

    constructor() {
        
        for (let i = 0; i < 2; i++) {
            this.balls.push(new Ball())
        }
        this.paddle = new Paddle(0, 87, 83, 65, 68)
        this.paddle2 = new Paddle(window.innerWidth, 38, 40, 37, 39)

        this.gameLoop()
    }
    
    private gameLoop(){
        for (const ball of this.balls) {
            ball.update()

            this.checkBallBounce(ball)
            if (this.checkCollision(ball.getRectangle(), this.paddle.getRectangle())) {
                console.log("BOTSING MET PADDLE")
                ball.bounceX()
                this.addPoint(1)
            }
            if (this.checkCollision(ball.getRectangle(), this.paddle2.getRectangle())) {
                console.log("BOTSING MET PADDLE")
                ball.bounceX()
                this.addPoint(2)
            }
        }
        this.paddle.update()
        this.paddle2.update()
       
        requestAnimationFrame(()=>this.gameLoop())
    }

    private checkBallBounce(ball : Ball) {
       // Top
        if(ball.y < 0) {
            ball.bounceY()
        
        }
        // Bottom 
        else if(ball.y + ball.div.clientHeight > window.innerHeight) {
            ball.bounceY()
        }

        else if(ball.x < 0) {
            ball.bounceX()
        }

        else if (ball.x + ball.div.clientWidth > window.innerWidth) {
            ball.bounceX()
    }
}

    private checkCollision(a: ClientRect, b: ClientRect) : boolean {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom)
     }

     /**
      * add point for a specific player
      * @param player player 1 (1)or player 2 (2)
      */
     private addPoint(player : number) {
         if(player == 1) {
            let score = document.getElementsByTagName("score")[0]
            this.score++
            score.innerHTML = "Score: "+this.score
         } else {
            let score = document.getElementsByTagName("score")[1]
            this.score2++
            score.innerHTML = "Score: "+this.score2
         }

         
         
     }
} 

window.addEventListener("load", () => new Game())