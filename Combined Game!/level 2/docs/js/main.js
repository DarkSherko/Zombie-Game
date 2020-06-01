"use strict";
var Ball = (function () {
    function Ball() {
        this._x = 0;
        this._y = 0;
        this.xspeed = 0;
        this.yspeed = 0;
        this._div = document.createElement("ball");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(this._div);
        this._x = Math.random() * window.innerWidth;
        this._y = Math.random() * window.innerHeight;
        this.xspeed = -5;
        this.yspeed = -3;
    }
    Object.defineProperty(Ball.prototype, "x", {
        get: function () { return this._x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "y", {
        get: function () { return this._y; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ball.prototype, "div", {
        get: function () { return this._div; },
        enumerable: true,
        configurable: true
    });
    Ball.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Ball.prototype.update = function () {
        this._x += this.xspeed;
        this._y += this.yspeed;
        this._div.style.transform = "translate(" + this._x + "px, " + this._y + "px)";
    };
    Ball.prototype.bounceX = function () {
        this.xspeed *= -1;
        this.xspeed *= 1.5;
    };
    Ball.prototype.bounceY = function () {
        this.yspeed *= -1;
    };
    return Ball;
}());
var Game = (function () {
    function Game() {
        this.balls = [];
        this.score = 0;
        this.score2 = 0;
        for (var i = 0; i < 2; i++) {
            this.balls.push(new Ball());
        }
        this.paddle = new Paddle(0, 87, 83, 65, 68);
        this.paddle2 = new Paddle(window.innerWidth, 38, 40, 37, 39);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        for (var _i = 0, _a = this.balls; _i < _a.length; _i++) {
            var ball = _a[_i];
            ball.update();
            this.checkBallBounce(ball);
            if (this.checkCollision(ball.getRectangle(), this.paddle.getRectangle())) {
                console.log("BOTSING MET PADDLE");
                ball.bounceX();
                this.addPoint(1);
            }
            if (this.checkCollision(ball.getRectangle(), this.paddle2.getRectangle())) {
                console.log("BOTSING MET PADDLE");
                ball.bounceX();
                this.addPoint(2);
            }
        }
        this.paddle.update();
        this.paddle2.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.checkBallBounce = function (ball) {
        if (ball.y < 0) {
            ball.bounceY();
        }
        else if (ball.y + ball.div.clientHeight > window.innerHeight) {
            ball.bounceY();
        }
    };
    Game.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    Game.prototype.addPoint = function (player) {
        if (player == 1) {
            var score = document.getElementsByTagName("score")[0];
            this.score++;
            score.innerHTML = "Score: " + this.score;
        }
        else {
            var score = document.getElementsByTagName("score")[1];
            this.score2++;
            score.innerHTML = "Score: " + this.score2;
        }
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Paddle = (function () {
    function Paddle(x, upKey, downKey, leftKey, rightKey) {
        var _this = this;
        this.downkey = 0;
        this.upkey = 0;
        this.leftkey = 0;
        this.rightkey = 0;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.div = document.createElement("paddle");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(this.div);
        this.upkey = upKey;
        this.downkey = downKey;
        this.leftkey = leftKey;
        this.rightkey = rightKey;
        if (x != 0)
            x -= this.div.clientWidth;
        this.x = x;
        this.y = 200;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
    }
    Paddle.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Paddle.prototype.onKeyDown = function (e) {
        console.log(e.keyCode);
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 5;
                break;
            case this.downkey:
                this.downSpeed = 5;
                break;
            case this.leftkey:
                this.leftSpeed = 5;
                break;
            case this.rightkey:
                this.rightSpeed = 5;
                break;
        }
    };
    Paddle.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0;
                break;
            case this.downkey:
                this.downSpeed = 0;
                break;
            case this.leftkey:
                this.leftSpeed = 0;
                break;
            case this.rightkey:
                this.rightSpeed = 0;
                break;
        }
    };
    Paddle.prototype.update = function () {
        var newY = this.y - this.upSpeed + this.downSpeed;
        if (newY > 0 && newY + 100 < window.innerHeight)
            this.y = newY;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Paddle;
}());
//# sourceMappingURL=main.js.map