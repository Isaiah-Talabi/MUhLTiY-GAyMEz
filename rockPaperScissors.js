// Initialize game state
let playerScore = 0;
let computerScore = 0;

function initRockPaperScissors() {
    // Create game elements
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = '';

    const scoreBoard = document.createElement('div');
    scoreBoard.id = 'scoreBoard';
    gameContainer.appendChild(scoreBoard);

    const resultBoard = document.createElement('div');
    resultBoard.id = 'resultBoard';
    gameContainer.appendChild(resultBoard);

    const choices = ['rock', 'paper', 'scissors'];
    choices.forEach(choice => {
        const button = document.createElement('button');
        button.textContent = choice;
        button.addEventListener('click', () => playRound(choice, computerPlay()));
        gameContainer.appendChild(button);
    });

    updateScoreBoard();
}

function playRound(playerSelection, computerSelection) {
    let result = '';
    if (playerSelection === computerSelection) {
        result = `It's a tie! You both chose ${playerSelection}.`;
    } else if (
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'scissors' && computerSelection === 'paper') ||
        (playerSelection === 'paper' && computerSelection === 'rock')
    ) {
        result = `You win! ${playerSelection} beats ${computerSelection}.`;
        playerScore++;
    } else {
        result = `You lose! ${computerSelection} beats ${playerSelection}.`;
        computerScore++;
    }

    updateScoreBoard();
    updateResultBoard(result);
}

function computerPlay() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function updateScoreBoard() {
    const scoreBoard = document.getElementById('scoreBoard');
    scoreBoard.textContent = `Player: ${playerScore}, Computer: ${computerScore}`;
}

function updateResultBoard(result) {
    const resultBoard = document.getElementById('resultBoard');
    resultBoard.textContent = result;
}

// Call the initialization function when the file is loaded
initRockPaperScissors();

