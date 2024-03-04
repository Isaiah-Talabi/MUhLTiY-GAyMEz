// Initialize game state
let words = ['hangman', 'javascript', 'microsoft', 'computer', 'keyboard', 'internet', 'software', 'programming', 'database', 'network'];
let secretWord = words[Math.floor(Math.random() * words.length)].split('');
let guessedLetters = Array(secretWord.length).fill('_');
let incorrectGuesses = 0;
let roundsWon = 0;

function initHangman() {
    // Create game elements
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = '';

    const scoreBoard = document.createElement('div');
    scoreBoard.id = 'scoreBoard';
    gameContainer.appendChild(scoreBoard);

    const resultBoard = document.createElement('div');
    resultBoard.id = 'resultBoard';
    gameContainer.appendChild(resultBoard);

    const input = document.createElement('input');
    input.type = 'text';
    input.maxLength = 1;
    gameContainer.appendChild(input);

    const guessButton = document.createElement('button');
    guessButton.textContent = 'Guess';
    guessButton.addEventListener('click', () => makeGuess(input));
    gameContainer.appendChild(guessButton);

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.addEventListener('click', resetGame);
    gameContainer.appendChild(resetButton);

    updateScoreBoard();
    updateResultBoard('');
}

function makeGuess(input) {
    const guess = input.value;
    let result = '';
    if (secretWord.includes(guess)) {
        for (let i = 0; i < secretWord.length; i++) {
            if (secretWord[i] === guess) {
                guessedLetters[i] = guess;
            }
        }
        result = `Good guess! The word now looks like this: ${guessedLetters.join(' ')}`;
    } else {
        result = `Sorry, the word doesn't contain the letter ${guess}.`;
        incorrectGuesses++;
    }

    if (!guessedLetters.includes('_')) {
        roundsWon++;
        result = `Congratulations! You guessed the word. The word was ${secretWord.join('')}.`;
        resetGame();
    } else if (incorrectGuesses === 10) {
        result += ` Sorry, you didn't guess the word. The word was ${secretWord.join('')}. Try again!`;
        resetGame();
    }

    updateScoreBoard();
    updateResultBoard(result);
}

function resetGame() {
    secretWord = words[Math.floor(Math.random() * words.length)].split('');
    guessedLetters = Array(secretWord.length).fill('_');
    incorrectGuesses = 0;
    updateScoreBoard();
    updateResultBoard('');
}

function updateScoreBoard() {
    const scoreBoard = document.getElementById('scoreBoard');
    scoreBoard.textContent = `Rounds won: ${roundsWon}`;
}

function updateResultBoard(result) {
    const resultBoard = document.getElementById('resultBoard');
    resultBoard.textContent = result;
}

// Call the initialization function when the file is loaded
initHangman();

