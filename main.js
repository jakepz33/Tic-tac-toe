

const Player = (name, symbol) => {
    return {
        name, 
        symbol,
    }
}


function GameBoard() {
    const rows = 3
    const columns = 3;
    const board = []

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push("");
        }
    }

    // see if cell is empty
    const isCellEmpty = (cellIndex) => board[cellIndex] === ' ';

    const updateCell = (cellIndex, symbol) => {
        if(isCellEmpty(cellIndex)) {
            board[cell] = symbol;
            return true; // move successful
        }
        return false; // Cell is already occupied
    }

    const getBoard = () => [...board];


    return {
        getBoard,
        updateCell,
        board,
    };
}

const GameFlow = ((player1, player2) => {
    let currentPlayer = player1;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const makeMove = (cellIndex) => {
        if (myBoard.updateCell(cellIndex, currentPlayer.symbol)) {
            switchPlayer();
            return true;
        }
        return false;
    }
    return {
        makeMove,
    }
})(Player('Player 1', 'X'), Player('Player 2', '0'));

const myBoard = GameBoard();

console.log(myBoard.board)

