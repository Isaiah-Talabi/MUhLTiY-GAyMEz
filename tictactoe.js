let board = Array(9).fill(null); // Game board
let playerTurn = true; // True if it's the player's turn, false if it's the computer's turn
let playerScore = 0;
let computerScore = 0;

// Initialize the game
function initialize() {
    // Clear the board
    board = Array(9).fill(null);
    playerTurn = true;

    // Create the game board
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = `
        <style>
            .game-board {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 10px;
                margin: 0 auto;
                width: 180px;
            }
            .cell {
                width: 60px;
                height: 60px;
                background-color: #ddd;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 2em;
                cursor: pointer;
            }
            #playerScore, #computerScore {
                margin-top: 20px;
                text-align: center;
            }
        </style>
        <div class="game-board">
            ${Array(9).fill('<div class="cell"></div>').join('')}
        </div>
        <div id="playerScore">Player Score: ${playerScore}</div>
        <div id="computerScore">Computer Score: ${computerScore}</div>
    `;

    // Add click event listeners to the cells
    const cells = gameContainer.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (board[index] === null) {
                board[index] = playerTurn ? 'X' : 'O';
                cell.textContent = board[index];
                checkGameStatus();
                playerTurn = !playerTurn;
                if (!playerTurn) {
                    computerMove(cells);
                }
            }
        });
    });
}

// Check the game status and update the scores if there's a winner
function checkGameStatus() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            if (board[a] === 'X') {
                playerScore++;
                document.getElementById('playerScore').textContent = "Player Score: " + playerScore;
                alert('Player wins!');
            } else {
                computerScore++;
                document.getElementById('computerScore').textContent = "Computer Score: " + computerScore;
                alert('Computer wins!');
            }
            initialize();
            return;
        }
    }

    // Check for a draw
    if (board.every(cell => cell !== null)) {
        alert('The game is a draw!');
        initialize();
    }
}

// Make a move for the computer
function computerMove(cells) {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            board[i] = 'O';
            cells[i].textContent = 'O';
            checkGameStatus();
            playerTurn = !playerTurn;
            break;
        }
    }
}

// Call the initialize function when the file is loaded
initialize();
