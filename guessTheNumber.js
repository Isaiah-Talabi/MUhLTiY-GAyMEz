// Initialize game state
let secretNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 10;

function initGuessTheNumber() {
    // Create game elements
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = '';

    const attemptsBoard = document.createElement('div');
    attemptsBoard.id = 'attemptsBoard';
    gameContainer.appendChild(attemptsBoard);

    const resultBoard = document.createElement('div');
    resultBoard.id = 'resultBoard';
    gameContainer.appendChild(resultBoard);

    const input = document.createElement('input');
    input.type = 'number';
    input.min = 1;
    input.max = 100;
    gameContainer.appendChild(input);

    const guessButton = document.createElement('button');
    guessButton.textContent = 'Guess';
    guessButton.addEventListener('click', () => makeGuess(input));
    gameContainer.appendChild(guessButton);

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.addEventListener('click', resetGame);
    gameContainer.appendChild(resetButton);

    updateAttemptsBoard();
}

function makeGuess(input) {
    const guess = Number(input.value);
    let result = '';
    if (guess === secretNumber) {
        result = 'Congratulations! You guessed the number.';
        resetGame();
    } else if (guess < secretNumber) {
        result = 'Too low!';
        attempts--;
    } else {
        result = 'Too high!';
        attempts--;
    }

    if (attempts === 0) {
        result += ` Sorry, you didn't guess the number. The number was ${secretNumber}. Try again!`;
        resetGame();
    }

    updateAttemptsBoard();
    updateResultBoard(result);
}

function resetGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 10;
    updateAttemptsBoard();
}

function updateAttemptsBoard() {
    const attemptsBoard = document.getElementById('attemptsBoard');
    attemptsBoard.textContent = `Attempts remaining: ${attempts}`;
}

function updateResultBoard(result) {
    const resultBoard = document.getElementById('resultBoard');
    resultBoard.textContent = result;
}

// Call the initialization function when the file is loaded
initGuessTheNumber();

