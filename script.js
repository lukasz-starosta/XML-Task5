import Game from './game.js';

// ELement definitions
const playButton = document.getElementById('play-button');
const welcomeScreen = document.getElementById('pong-welcome-screen');
const pongFieldScreen = document.getElementById('pong-field-screen');

// Game

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
const game = new Game();
game.startGame();
