const createGameBoard = () => {
    const board = [];
    for (let i = 0; i < 3; i++) {
        board.push([]);
        for (let j = 0; j <3; j++) {
            board[i].push(' ');
        }
    }
    return board;
}

const player = (name, mark) => ({ name, mark });

const initializePlayers = () => {
    const player1Name = document.getElementById('player1').value;
    const player2Name = document.getElementById('player2').value;

    return {
        player1: player(player1Name, 'X'),
        player2: player(player2Name, 'O')
    };
};

const createGame = () => {
    let winner;
    let board;
    let currentPlayer;
    let players;

    const startGame = () => {
        players = initializePlayers();
        currentPlayer = players.player1;
        winner = null;
        board = createGameBoard();
        return players;
    }

    const play = (row, col) => {
        if (board[row][col] === ' ') {
            board[row][col] = currentPlayer.mark;
            if (checkWinner()) {
                winner = currentPlayer;
            } else {
                currentPlayer = currentPlayer === players.player1 ? players.player2 : players.player1;
            }
        }
    }

    const checkWinner = () => {
        let win = false;
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === currentPlayer.mark && board[i][1] === currentPlayer.mark && board[i][2] === currentPlayer.mark) {
                win = true;
            }
            if (board[0][i] === currentPlayer.mark && board[1][i] === currentPlayer.mark && board[2][i] === currentPlayer.mark) {
                win = true;
            }
        }
        if (board[0][0] === currentPlayer.mark && board[1][1] === currentPlayer.mark && board[2][2] === currentPlayer.mark) {
            win = true;
        }
        if (board[0][2] === currentPlayer.mark && board[1][1] === currentPlayer.mark && board[2][0] === currentPlayer.mark) {
            win = true;
        }
        return win;
    }

    return {startGame, play, getBoard: () => board, getWinner: () => winner};
}

const createDisplayController = () => {
    const container = document.querySelector('.container');
    const div = document.createElement('div');
    div.classList.add('board');
    const gameInstance = createGame();

    const form = document.getElementById('form');
    const newGame = document.getElementById('reset');
    newGame.textContent = 'New Game';
    form.appendChild(newGame);

    newGame.style.display = 'none';

    const showWinner = (tieFlag) => {
        const winner = gameInstance.getWinner();
        const dialog = document.getElementById('dialog');
        dialog.innerHTML = '';
        dialog.showModal();
        const p = document.createElement('p');
        const button = document.createElement('button');
        if (tieFlag) {
            p.textContent = 'It\'s a tie!';
        } else {
            p.textContent = `${winner.name} wins!`;
        }
        button.textContent = 'Play again';
        dialog.appendChild(p);
        dialog.appendChild(button);
        button.addEventListener('click', function () {
            dialog.close();
            gameInstance.startGame();
            createBoard();
        });
    }

    const renderBoard = () => {
        const cells = document.querySelectorAll('.cell');
        let tieFlag = true;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameInstance.getBoard()) {}
                cells[i * 3 + j].textContent = gameInstance.getBoard() ? gameInstance.getBoard()[i][j] : ' ';
            }
        }
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (cells[i * 3 + j].textContent === ' ') {
                    tieFlag = false;
                }
            }
        }
        if (!tieFlag && gameInstance.getWinner()) {
            showWinner(tieFlag);
        } else if (tieFlag) {
            showWinner(tieFlag);
        }
    }

    const createBoard = () => {  
        div.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < 3; j++) {
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.addEventListener('click', () => {
                    gameInstance.play(i, j);
                    renderBoard();
                });
                row.appendChild(cell);
            }
            div.appendChild(row);
        }
    }

    const handleNewGame = (e) => {
        e.preventDefault();
        container.removeChild(div);
        document.getElementById('player1').value = '';
        document.getElementById('player2').value = '';
    }

    document.addEventListener('submit', (e) => {
        e.preventDefault();
        gameInstance.startGame();
        createBoard();
        container.appendChild(div);
        newGame.style.display = 'block';
        newGame.addEventListener('click', handleNewGame);
    });

    return {renderBoard};
}

const display = createDisplayController();
display.renderBoard();