import { Player, Ball, Field } from './elements.js';

// ELement definitions
const playButton = document.getElementById('play-button');
const welcomeScreen = document.getElementById('pong-welcome-screen');
const pongFieldScreen = document.getElementById('pong-field-screen');

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
    // Initialize the neccessary objects
    const ball = new Ball('ball');
    const leftPlayer = new Player('left-player');
    const rightPlayer = new Player('right-player');
    const field = new Field('pong-field');

    function moveBall() {
        if (
            ball.y >= field.bottomBound - ball.radius ||
            ball.y <= field.topBound + ball.radius
        ) {
            ball.directionY *= -1;
        } else if (
            ball.x >= field.rightBound - ball.radius ||
            ball.x <= field.leftBound + ball.radius
        ) {
            ball.directionX *= -1;
        }

        ball.x += ball.directionX;
        ball.y += ball.directionY;

        requestAnimationFrame(moveBall);
    }

    requestAnimationFrame(moveBall);
}
