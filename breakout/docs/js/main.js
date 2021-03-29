"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(tag) {
        this.x = 0;
        this.y = 0;
        this._div = document.createElement(tag);
        var level = document.getElementsByTagName("game")[0];
        level.appendChild(this._div);
    }
    Object.defineProperty(GameObject.prototype, "div", {
        get: function () { return this._div; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "getX", {
        get: function () { return this.x; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "getY", {
        get: function () { return this.y; },
        enumerable: true,
        configurable: true
    });
    GameObject.prototype.getRectangle = function () {
        return this._div.getBoundingClientRect();
    };
    return GameObject;
}());
var Ball = (function (_super) {
    __extends(Ball, _super);
    function Ball(level) {
        var _this = _super.call(this, 'ball') || this;
        _this.xspeed = 0;
        _this.yspeed = 0;
        _this.level = level;
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(_this.div);
        _this.x = 600;
        _this.y = 450;
        _this.xspeed = Math.floor(Math.random() * 6) - 3;
        _this.yspeed = -7;
        return _this;
    }
    Ball.prototype.update = function () {
        this.x += this.xspeed;
        this.y += this.yspeed;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Ball.prototype.bounceX = function () {
        this.xspeed *= -1;
    };
    Ball.prototype.bounceY = function () {
        this.yspeed *= -1;
    };
    return Ball;
}(GameObject));
var Game = (function () {
    function Game() {
        this.lives = 3;
        var game = document.getElementsByTagName('game')[0];
        this.scoreElement = document.createElement("score");
        this.scoreElement.innerHTML = "Bricks left: 0";
        this.livesElement = document.createElement("lives");
        this.livesElement.innerHTML = "Lives: 3";
        game.appendChild(this.scoreElement);
        game.appendChild(this.livesElement);
        this.ball = new Ball(this);
        this.grid = new Grid;
        this.score = this.grid.bricks.length;
        this.paddle = new Paddle(0, 65, 68);
        this.gameLoop();
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.ball.update();
        this.checkBallBounce(this.ball);
        if (this.checkCollision(this.ball.getRectangle(), this.paddle.getRectangle())) {
            this.ball.bounceY();
        }
        for (var _i = 0, _a = this.grid.bricks; _i < _a.length; _i++) {
            var block = _a[_i];
            if (this.checkCollision(this.ball.getRectangle(), block.getBoundingClientRect())) {
                block.remove();
                this.ball.bounceY();
                this.addPoint();
            }
        }
        this.paddle.update();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.checkBallBounce = function (ball) {
        if (ball.getY < 0) {
            ball.bounceY();
        }
        else if (ball.getX < 0) {
            ball.bounceX();
        }
        else if (ball.getX + ball.div.clientWidth > window.innerWidth) {
            ball.bounceX();
        }
        else if (ball.getY + ball.div.clientHeight > window.innerHeight) {
            this.loseLife();
            this.reset();
        }
    };
    Game.prototype.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    Game.prototype.addPoint = function () {
        if (this.lives > 0) {
            this.score--;
            this.scoreElement.innerHTML = "Bricks left: " + this.score;
        }
    };
    Game.prototype.loseLife = function () {
        this.lives--;
        this.livesElement.innerHTML = "Lives: " + this.lives;
        if (this.lives <= 0) {
            this.scoreElement.innerHTML = "Bricks left: You lose";
        }
    };
    Game.prototype.reset = function () {
        document.getElementsByTagName('paddle')[0].remove();
        document.getElementsByTagName('ball')[0].remove();
        this.paddle = new Paddle(0, 65, 68);
        this.ball = new Ball(this);
    };
    return Game;
}());
window.addEventListener("load", function () { return new Game(); });
var Grid = (function () {
    function Grid() {
        this.columns = 12;
        this.rows = 7;
        this.bricks = new Array();
        var game = document.getElementsByTagName("game")[0];
        var brick;
        console.log("Grid created!");
        for (var row = 0; row < this.rows; row++) {
            for (var column = 0; column < this.columns; column++) {
                brick = document.createElement('brick');
                game.appendChild(brick);
                this.bricks.push(brick);
                brick.style.transform = "translate(" + (column * 64 + 260) + "px," + (row * 32 + 70) + "px)";
            }
        }
    }
    return Grid;
}());
var Paddle = (function (_super) {
    __extends(Paddle, _super);
    function Paddle(x, leftKey, rightKey) {
        var _this = _super.call(this, 'paddle') || this;
        _this.leftkey = 0;
        _this.rightkey = 0;
        _this.leftSpeed = 0;
        _this.rightSpeed = 0;
        var game = document.getElementsByTagName("game")[0];
        game.appendChild(_this.div);
        _this.leftkey = leftKey;
        _this.rightkey = rightKey;
        if (x != 0)
            x -= _this.div.clientWidth;
        _this.x = 600;
        _this.y = 500;
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        return _this;
    }
    Paddle.prototype.onKeyDown = function (e) {
        console.log(e.keyCode);
        switch (e.keyCode) {
            case this.leftkey:
                this.leftSpeed = 7;
                break;
            case this.rightkey:
                this.rightSpeed = 7;
                break;
        }
    };
    Paddle.prototype.onKeyUp = function (e) {
        switch (e.keyCode) {
            case this.leftkey:
                this.leftSpeed = 0;
                break;
            case this.rightkey:
                this.rightSpeed = 0;
                break;
        }
    };
    Paddle.prototype.update = function () {
        var newX = this.x - this.leftSpeed + this.rightSpeed;
        if (newX > 0 && newX + 100 < window.innerWidth)
            this.x = newX;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Paddle;
}(GameObject));
//# sourceMappingURL=main.js.map