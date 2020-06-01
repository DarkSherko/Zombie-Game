"use strict";
var Game = (function () {
    function Game() {
        this.zombie = new Zombie(0, 87, 83, 68, 65);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.zombie.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Zombie = (function () {
    function Zombie(x, upKey, downKey, rightKey, leftKey) {
        var _this = this;
        this.downkey = 0;
        this.upkey = 0;
        this.rightkey = 0;
        this.leftkey = 0;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.rightSpeed = 0;
        this.leftSpeed = 0;
        this.div = document.createElement("zombie");
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(this.div);
        this.upkey = upKey;
        this.downkey = downKey;
        this.rightkey = rightKey;
        this.leftkey = leftKey;
        if (x != 0)
            x -= this.div.clientWidth;
        this.x = x;
        this.y = 200;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        window.addEventListener("keyright", function (e) { return _this.onKeyRight(e); });
        window.addEventListener("keyleft", function (e) { return _this.onKeyLeft(e); });
    }
    Zombie.prototype.getRectangle = function () {
        return this.div.getBoundingClientRect();
    };
    Zombie.prototype.onKeyDown = function (e) {
        console.log(e.keyCode);
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 5;
                break;
            case this.downkey:
                this.downSpeed = 5;
                break;
            case this.rightkey:
                this.rightSpeed = 5;
                break;
            case this.leftkey:
                this.leftSpeed = 5;
                break;
        }
    };
    Zombie.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.upkey:
                this.upSpeed = 0;
                break;
            case this.downkey:
                this.downSpeed = 0;
                break;
            case this.rightkey:
                this.rightSpeed = 0;
                break;
            case this.leftkey:
                this.leftSpeed = 0;
                break;
        }
    };
    Zombie.prototype.update = function () {
        var newY = this.y - this.upSpeed + this.downSpeed;
        if (newY > 0 && newY + 100 < window.innerHeight)
            this.y = newY;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Zombie;
}());
//# sourceMappingURL=main.js.map