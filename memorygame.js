// Initialize game state
let words = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F'];
let cards = shuffle(words);
let flippedCards = [];
let matchedPairs = 0;

function initMemoryGame() {
    // Create game elements
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = '';

    const scoreBoard = document.createElement('div');
    scoreBoard.id = 'scoreBoard';
    gameContainer.appendChild(scoreBoard);

    const resultBoard = document.createElement('div');
    resultBoard.id = 'resultBoard';
    gameContainer.appendChild(resultBoard);

    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'card';
        cardElement.dataset.value = card;
        cardElement.textContent = '?';
        cardElement.addEventListener('click', () => flipCard(cardElement, index));
        gameContainer.appendChild(cardElement);
    });

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.addEventListener('click', resetGame);
    gameContainer.appendChild(resetButton);

    updateScoreBoard();
    updateResultBoard('Game started! Good luck!');
}

function flipCard(cardElement, index) {
    if (flippedCards.length < 2 && !cardElement.classList.contains('flipped')) {
        cardElement.textContent = cards[index];
        cardElement.classList.add('flipped');
        flippedCards.push(cardElement);

        if (flippedCards.length === 2) {
            if (flippedCards[0].dataset.value === flippedCards[1].dataset.value) {
                matchedPairs++;
                flippedCards = [];
                updateResultBoard('You found a match!');
                if (matchedPairs === cards.length / 2) {
                    updateResultBoard('Congratulations! You matched all pairs.');
                    resetGame();
                }
            } else {
                setTimeout(() => {
                    flippedCards.forEach(card => {
                        card.textContent = '?';
                        card.classList.remove('flipped');
                    });
                    flippedCards = [];
                    updateResultBoard('No match. Try again!');
                }, 1000);
            }
        }

        updateScoreBoard();
    }
}

function resetGame() {
    cards = shuffle(words);
    flippedCards = [];
    matchedPairs = 0;
    initMemoryGame();
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function updateScoreBoard() {
    const scoreBoard = document.getElementById('scoreBoard');
    scoreBoard.textContent = `Matched pairs: ${matchedPairs}`;
}

function updateResultBoard(result) {
    const resultBoard = document.getElementById('resultBoard');
    resultBoard.textContent = result;
}

// Call the initialization function when the file is loaded
initMemoryGame();
