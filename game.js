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
        if (
            this.ball.y >= this.field.bottomBound - this.ball.radius ||
            this.ball.y <= this.field.topBound + this.ball.radius
        ) {
            this.ball.directionY *= -1;
        } else if (this.ball.x >= this.field.rightBound - this.ball.radius) {
            this.scoreLeft.addPoint();
            this.ballReset();
        } else if (this.ball.x <= this.field.leftBound + this.ball.radius) {
            this.scoreRight.addPoint();
            this.ballReset();
        }
        this.ball.x += this.ball.directionX;
        this.ball.y += this.ball.directionY;

        if (this.pressedKeys.w) {
            this.moveLeftPlayer('w');
        }
        if (this.pressedKeys.s) {
            this.moveLeftPlayer('s');
        }
        if (this.pressedKeys.ArrowUp) {
            this.moveRightPlayer('ArrowUp');
        }
        if (this.pressedKeys.ArrowDown) {
            this.moveRightPlayer('ArrowDown');
        }

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

    moveLeftPlayer(key) {
        if (key === 's') {
            this.leftPlayer.y++;
        } else {
            this.leftPlayer.y--;
        }
    }
    moveRightPlayer(key) {
        if (key === 'ArrowDown') {
            this.rightPlayer.y++;
        } else {
            this.rightPlayer.y--;
        }
    }
}
