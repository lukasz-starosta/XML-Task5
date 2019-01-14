import Game from './game.js';

// ELement definitions
const playButton = document.getElementById('play-button');
const welcomeScreen = document.getElementById('pong-welcome-screen');
const pongFieldScreen = document.getElementById('pong-field-screen');

// Game
const game = new Game();

function hideWelcomeScreen() {
    welcomeScreen.classList.add('transparent');
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        pongFieldScreen.style.display = 'visible';
        pongFieldScreen.classList.remove('transparent');
        setTimeout(() => game.startGame(), 800);
    }, 700);
}
playButton.addEventListener('click', hideWelcomeScreen);
