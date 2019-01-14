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

        this.animationSpeed = 2;
        this.paused = false;
        this.handle;
    }

    startGame() {
        this.initializeEventHandlers();
        this.handle = requestAnimationFrame(this.animate.bind(this));
    }

    animate() {
        this.movePlayers();
        this.moveBall();

        if (!this.paused) requestAnimationFrame(this.animate.bind(this));
    }

    initializeEventHandlers() {
        const validKeys = ['w', 's', 'ArrowUp', 'ArrowDown', 'p'];

        document.addEventListener('keydown', e => {
            if (!validKeys.includes(e.key)) return;
            if (e.key === 'p') {
                this.paused = !this.paused;
                if (!this.paused) {
                    requestAnimationFrame(this.animate.bind(this));
                }
            } else this.pressedKeys[e.key] = true;
        });

        document.addEventListener('keyup', e => {
            if (!validKeys.includes(e.key) || e.key === 'p') return;

            this.pressedKeys[e.key] = false;
        });
    }

    ballReset(hasLeftScored) {
        this.ball.x = this.field.leftBound + this.field.width / 2;
        this.ball.y = this.field.topBound + this.field.height / 2;
        this.ball.directionY = 0;
        this.ball.directionX = hasLeftScored ? 1 : -1;
    }

    moveBall() {
        this.colission();
        this.ball.x += this.ball.directionX * this.animationSpeed;
        this.ball.y += this.ball.directionY * this.animationSpeed;
    }

    movePlayers() {
        if (this.pressedKeys.w && this.leftPlayer.y > this.field.topBound) {
            this.leftPlayer.y -= 2;
        } else if (
            this.pressedKeys.s &&
            this.leftPlayer.y + this.leftPlayer.height < this.field.bottomBound
        ) {
            this.leftPlayer.y += 2;
        }
        if (
            this.pressedKeys.ArrowUp &&
            this.rightPlayer.y > this.field.topBound
        ) {
            this.rightPlayer.y -= 2;
        } else if (
            this.pressedKeys.ArrowDown &&
            this.rightPlayer.y + this.rightPlayer.height <
                this.field.bottomBound
        ) {
            this.rightPlayer.y += 2;
        }
    }

    colission() {
        if (
            this.ball.y >=
                this.field.bottomBound -
                    this.ball.radius / this.animationSpeed ||
            this.ball.y <=
                this.field.topBound + this.ball.radius / this.animationSpeed
        ) {
            this.ball.directionY *= -1;
        } else if (
            this.ball.x + this.ball.radius / this.animationSpeed ===
                this.field.rightBound - this.rightPlayer.width &&
            this.isWithinPlayerReach(this.rightPlayer)
        ) {
            const playerCenter =
                this.rightPlayer.y + this.rightPlayer.height / 2;
            let deflectFactor =
                (this.ball.y - playerCenter) / this.rightPlayer.height;
            this.ball.directionY += deflectFactor;
            this.ball.directionX *= -1;
        } else if (this.ball.x > this.field.rightBound) {
            this.scoreLeft.addPoint();
            this.ballReset(true);
        } else if (
            this.ball.x - this.ball.radius / this.animationSpeed ===
                this.field.leftBound + this.leftPlayer.width &&
            this.isWithinPlayerReach(this.leftPlayer)
        ) {
            const playerCenter = this.leftPlayer.y + this.leftPlayer.height / 2;
            let deflectFactor =
                (this.ball.y - playerCenter) / this.leftPlayer.height;
            this.ball.directionY += deflectFactor;
            this.ball.directionX *= -1;
        } else if (this.ball.x < this.field.leftBound) {
            this.scoreRight.addPoint();
            this.ballReset(false);
        }
    }

    isWithinPlayerReach(player) {
        return (
            this.ball.y + this.ball.radius >= player.y &&
            this.ball.y - this.ball.radius <= player.y + player.height
        );
    }
}
