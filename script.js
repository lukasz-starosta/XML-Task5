// ELement definitions
const playButton = document.getElementById('play-button');
const welcomeScreen = document.getElementById('pong-welcome-screen');
const pongFieldScreen = document.getElementById('pong-field-screen');

function hideWelcomeScreen() {
    welcomeScreen.classList.add('transparent');
    setTimeout(() => {
        welcomeScreen.style.display = 'none';
        pongFieldScreen.style.display = 'visible';
        pongFieldScreen.classList.remove('transparent');
    }, 700);
}

playButton.addEventListener('click', hideWelcomeScreen);
