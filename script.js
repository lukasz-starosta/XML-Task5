import { Player, Ball, Field, Score } from './elements.js';

// ELement definitions
const playButton = document.getElementById('play-button');
const welcomeScreen = document.getElementById('pong-welcome-screen');
const pongFieldScreen = document.getElementById('pong-field-screen');

// Game
const ball = new Ball('ball');
const leftPlayer = new Player('left-player');
const rightPlayer = new Player('right-player');
const field = new Field('pong-field');
const scoreLeft = new Score('left-score');
const scoreRight = new Score('right-score');
// function hideWelcomeScreen() {
//     welcomeScreen.classList.add('transparent');
//     setTimeout(() => {
//         welcomeScreen.style.display = 'none';
//         pongFieldScreen.style.display = 'visible';
//         pongFieldScreen.classList.remove('transparent');
//         startGame();
//     }, 700);
// }
// playButton.addEventListener('click', hideWelcomeScreen);

// Game engine
startGame();
function startGame() {
    function moveBall() {
        if (
            ball.y >= field.bottomBound - ball.radius ||
            ball.y <= field.topBound + ball.radius
        ) {
            ball.directionY *= -1;
        } else if (ball.x >= field.rightBound - ball.radius) {
            scoreLeft.addPoint();
            ballReset();
        } else if (ball.x <= field.leftBound + ball.radius) {
            scoreRight.addPoint();
            ballReset();
        }
        ball.x += ball.directionX;
        ball.y += ball.directionY;

        if (pressedKeys.w) {
            moveLeftPlayer('w');
        }
        if (pressedKeys.s) {
            moveLeftPlayer('s');
        }
        if (pressedKeys.ArrowUp) {
            moveRightPlayer('ArrowUp');
        }
        if (pressedKeys.ArrowDown) {
            moveRightPlayer('ArrowDown');
        }

        requestAnimationFrame(moveBall);
    }

    initializeEventHandlers();
    requestAnimationFrame(moveBall);
}

function ballReset() {
    ball.x = field.leftBound + field.width / 2;
    ball.y = field.topBound + field.height / 2;
}

const pressedKeys = {
    w: false,
    s: false,
    ArrowUp: false,
    ArrowDown: false
};
function initializeEventHandlers() {
    const validKeys = ['w', 's', 'ArrowUp', 'ArrowDown'];

    document.addEventListener('keydown', e => {
        if (!validKeys.includes(e.key)) return;

        pressedKeys[e.key] = true;
    });

    document.addEventListener('keyup', e => {
        if (!validKeys.includes(e.key)) return;

        pressedKeys[e.key] = false;
    });
}

function moveLeftPlayer(key) {
    if (key === 's') {
        leftPlayer.y++;
    } else {
        leftPlayer.y--;
    }
}
function moveRightPlayer(key) {
    if (key === 'ArrowDown') {
        rightPlayer.y++;
    } else {
        rightPlayer.y--;
    }
}
