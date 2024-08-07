const gameBoard = function () {
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

const game = function () {
    let winner = null;
    let board = gameBoard();
    let currentPlayer;
    let players;

    const startGame = () => {
        players = initializePlayers();
        currentPlayer = players.player1;
        return players;
    }

    const play = function (row, col) {
        if (board[row][col] === ' ') {
            board[row][col] = currentPlayer.mark;
            if (checkWinner()) {
                winner = currentPlayer;
            } else {
                currentPlayer = currentPlayer === players.player1 ? players.player2 : players.player1;
            }
        }
    }

    const checkWinner = function () {
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

const displayController = function () {
    const container = document.querySelector('.container');
    const div = document.createElement('div');
    div.classList.add('board');
    const ticTacToe = game();
    ticTacToe.startGame();
    
    for (let i = 0; i < 3; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', function () {
                ticTacToe.play(i, j);
                if (ticTacToe.getWinner()) {
                    alert(`${ticTacToe.getWinner()} wins!`);
                }
                render();
            });
            row.appendChild(cell);
        }
        div.appendChild(row);
    }

    const render = function () {
        const cells = document.querySelectorAll('.cell');
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                cells[i * 3 + j].textContent = ticTacToe.getBoard()[i][j];
            }
        }
    }

    container.appendChild(div);

    return {render};
}

const display = displayController();
display.render();