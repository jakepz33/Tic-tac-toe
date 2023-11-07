

const Player = (name, symbol) => {
    return {
        name, 
        symbol,
    }
}


function GameBoard() {
    const rows = 3
    const columns = 3;
    const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]

    const updateBoard = (one, two, playerSymbol) => {
        // make index become value of Player
        board[one][two] = playerSymbol;
        // ** check to see if index is taken **
    }
    
    const printGame = () => {

    }

    // GameBoard Return Statement
    return {
        board,
        updateBoard,
    }
}

function Flow(player1Name, player2Name) {

    const player1 = Player(player1Name, 'X');
    const player2 = Player(player2Name, 'O');
    const myBoard = GameBoard()
    let playerTurn = player1

    const showPlayers = () => {
        return [player1, player2]
    }

    const switchTurns = () => { // switches players turn
        playerTurn = playerTurn === player1 ? player2 : player1;
    }

    const makeMove = (index1, index2) => {
    
        // should change the value of the index
        myBoard.updateBoard(index1, index2, playerTurn.symbol);
        // switch players turn after updating
        switchTurns();
    }

    const checkWinner = () => {
        
    }


    return {
        showPlayers,
        myBoard,
        makeMove,
    }
}

// const game = GameBoard();
// console.log(game.board);
// game.updateBoard(0, 0);
// console.log(game.board);

const newGame = Flow('Jake', 'Josh')
console.log(newGame.showPlayers())

newGame.makeMove(1, 1); // X
newGame.makeMove(2, 0); // O
console.log(newGame.myBoard.board)
newGame.makeMove(1, 0); // X
newGame.makeMove(2, 1); // O

console.log(newGame.myBoard.board)


