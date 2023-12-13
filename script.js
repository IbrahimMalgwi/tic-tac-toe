document.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.getElementById('game-container');
    const board = document.getElementById('game-board');
    const resultScreen = document.getElementById('result-screen');
    const resultMessage = document.getElementById('result-message');
    const newGameButton = document.getElementById('new-game-button');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];

    // Create the game board cells dynamically
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', () => handleCellClick(i));
        board.appendChild(cell);
    }

    // Function to handle cell clicks
    function handleCellClick(index) {
        if (gameBoard[index] === '' && !checkWinner()) {
            gameBoard[index] = currentPlayer;
            renderBoard();
            if (checkWinner()) {
                showResult(`Player ${currentPlayer} wins!`);
            } else if (!gameBoard.includes('')) {
                showResult('It\'s a draw!');
            } else {
                switchPlayer();
            }
        }
    }

    // Function to switch players (X or O)
    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    // Function to check for a winner
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]              // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                highlightWinnerCells(pattern);
                return true;
            }
        }

        return false;
    }

    // Function to highlight the cells when there is a winner
    function highlightWinnerCells(pattern) {
        for (const index of pattern) {
            const cell = board.children[index];
            cell.style.backgroundColor = '#8bc34a'; // Highlight color
        }
    }

    // Function to render the game board
    function renderBoard() {
        for (let i = 0; i < 9; i++) {
            const cell = board.children[i];
            cell.textContent = gameBoard[i];
            cell.style.backgroundColor = ''; // Reset background color
        }
    }

    // Function to show the result screen
    function showResult(message) {
        resultMessage.textContent = message;
        resultScreen.style.display = 'flex';
    }

    // Function to hide the result screen
    function hideResult() {
        resultScreen.style.display = 'none';
    }

    // Function to reset the game
    function resetGame() {
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        renderBoard();
        hideResult();
    }

    // Event listener for the new game button
    newGameButton.addEventListener('click', resetGame);

    // Initial rendering of the game board
    renderBoard();
});
