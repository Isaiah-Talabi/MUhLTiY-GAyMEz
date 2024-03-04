// Initialize game state
let colors = ['red', 'green', 'blue', 'yellow'];
let sequence = [];
let playerSequence = [];
let round = 0;

function initSimonGame() {
    // Create game elements
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = '';

    const instructions = document.createElement('div');
    instructions.textContent = 'Follow the sequence of colors. Click the Start button to begin.';
    gameContainer.appendChild(instructions);

    const scoreBoard = document.createElement('div');
    scoreBoard.id = 'scoreBoard';
    gameContainer.appendChild(scoreBoard);

    const resultBoard = document.createElement('div');
    resultBoard.id = 'resultBoard';
    gameContainer.appendChild(resultBoard);

    colors.forEach(color => {
        const colorButton = document.createElement('button');
        colorButton.className = `color-button ${color}`;
        colorButton.style.backgroundColor = color;
        colorButton.addEventListener('click', () => handleColorClick(color));
        gameContainer.appendChild(colorButton);
    });

    const startButton = document.createElement('button');
    startButton.textContent = 'Start';
    startButton.addEventListener('click', startRound);
    gameContainer.appendChild(startButton);

    updateScoreBoard();
    updateResultBoard('');
}

function startRound() {
    playerSequence = [];
    sequence.push(getRandomColor());
    round++;
    updateScoreBoard();
    updateResultBoard('Watch the sequence...');
    playSequence();
}

function handleColorClick(color) {
    playerSequence.push(color);
    if (playerSequence[playerSequence.length - 1] !== sequence[playerSequence.length - 1]) {
        updateResultBoard('Wrong color! Game over.');
        resetGame();
    } else if (playerSequence.length === sequence.length) {
        setTimeout(() => {
            updateResultBoard('Good job! Get ready for the next round...');
            startRound();
        }, 1000);
    }
}

function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

function playSequence() {
    sequence.forEach((color, index) => {
        setTimeout(() => {
            const colorButton = document.querySelector(`.${color}`);
            colorButton.style.backgroundColor = 'lightgrey';
            setTimeout(() => {
                colorButton.style.backgroundColor = color;
            }, 500);
        }, index * 1000);
    });
}

function resetGame() {
    sequence = [];
    playerSequence = [];
    round = 0;
    updateScoreBoard();
    updateResultBoard('Game reset. Click Start to play again.');
}

function updateScoreBoard() {
    const scoreBoard = document.getElementById('scoreBoard');
    scoreBoard.textContent = `Round: ${round}`;
}

function updateResultBoard(result) {
    const resultBoard = document.getElementById('resultBoard');
    resultBoard.textContent = result;
}

// Call the initialization function when the file is loaded
initSimonGame();

