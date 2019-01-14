import { Player, Ball, Field, Score } from './elements.js';

export default class Game {
    constructor() {
        this.ball = new Ball('ball');
        this.leftPlayer = new Player('left-player');
        this.rightPlayer = new Player('right-player');
        this.field = new Field('pong-field');
        this.scoreLeft = new Score('left-score');
        this.scoreRight = new Score('right-score');

        this.pressedKeys = {
            w: false,
            s: false,
            ArrowUp: false,
            ArrowDown: false
        };
    }

    startGame() {
        this.initializeEventHandlers();
        requestAnimationFrame(this.animate.bind(this));
    }

    animate() {
        this.movePlayers();
        this.moveBall();

        requestAnimationFrame(this.animate.bind(this));
    }

    initializeEventHandlers() {
        const validKeys = ['w', 's', 'ArrowUp', 'ArrowDown'];

        document.addEventListener('keydown', e => {
            if (!validKeys.includes(e.key)) return;

            this.pressedKeys[e.key] = true;
        });

        document.addEventListener('keyup', e => {
            if (!validKeys.includes(e.key)) return;

            this.pressedKeys[e.key] = false;
        });
    }

    ballReset() {
        this.ball.x = this.field.leftBound + this.field.width / 2;
        this.ball.y = this.field.topBound + this.field.height / 2;
    }

    moveBall() {
        this.detectColission();
        this.ball.x += this.ball.directionX;
        this.ball.y += this.ball.directionY;
    }

    movePlayers() {
        if (this.pressedKeys.w && this.leftPlayer.y > this.field.topBound) {
            this.leftPlayer.y--;
        } else if (
            this.pressedKeys.s &&
            this.leftPlayer.y + this.leftPlayer.height < this.field.bottomBound
        ) {
            this.leftPlayer.y++;
        }
        if (
            this.pressedKeys.ArrowUp &&
            this.rightPlayer.y > this.field.topBound
        ) {
            this.rightPlayer.y--;
        } else if (
            this.pressedKeys.ArrowDown &&
            this.rightPlayer.y + this.rightPlayer.height <
                this.field.bottomBound
        ) {
            this.rightPlayer.y++;
        }
    }

    detectColission() {
        if (
            this.ball.y >= this.field.bottomBound - this.ball.radius ||
            this.ball.y <= this.field.topBound + this.ball.radius
        ) {
            this.ball.directionY *= -1;
        } else if (
            this.ball.x + this.ball.radius ===
                this.field.rightBound - this.rightPlayer.width &&
            (this.ball.y >= this.rightPlayer.y &&
                this.ball.y <= this.rightPlayer.y + this.rightPlayer.height)
        ) {
            this.ball.directionX *= -1;
        } else if (this.ball.x > this.field.rightBound) {
            this.scoreLeft.addPoint();
            this.ballReset();
        } else if (
            this.ball.x - this.ball.radius ===
                this.field.leftBound + this.leftPlayer.width &&
            (this.ball.y >= this.leftPlayer.y &&
                this.ball.y <= this.leftPlayer.y + this.leftPlayer.height)
        ) {
            this.ball.directionX *= -1;
        } else if (this.ball.x < this.field.leftBound) {
            this.scoreRight.addPoint();
            this.ballReset();
        }
    }
}
