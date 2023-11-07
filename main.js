

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
       
        // ** check to see if index is taken **
        if (one >= rows || two >= columns) {
            return "Failure"
        } else if (board[one][two] !== '') {
            return "Failure"// player switch doesn't happen
        } else {
            board[one][two] = playerSymbol;
            return "Success"
        }
        
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
        const moveResult = myBoard.updateBoard(index1, index2, playerTurn.symbol);

        if (moveResult === "Success") {
            switchTurns()
            console.log('Valid move')
            const result = checkWinner(myBoard.board);
            if (result) {
                if (result === "draw") {
                    console.log("It's a draw!");
                } else {
                    console.log(`${result} wins`);
                }
            }
        } else {
            console.log('Invalid move, try again.')
        }        
    }

    const checkWinner = (board) => {
        for (let row = 0; row < 3; row++) {
            if (board[row][0] === board[row][1] && board[row][0] == board[row][2] && board[row][0] !== '') {
                return board[row][0];
            }
        }

        for (let col = 0; col < 3; col++) {
            if (board[0][col] === board[1][col] && board[0][col] === board[2][col] && board[0][col] !== '') {
                return board[0][col]
            }
        }

        // check for diagonals
        if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== '') {
            return board[0][0];
        }
        if (board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== '') {
            return board[0][2];
        }

        // check for DRAW
        let isDraw = true;
        for (let row = 0; row < 3; row ++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === '') { // checks if all squares are filled.
                    isDraw = false;           // changes to false -> break 
                    break;
                }
            }
        }
        if (isDraw) { // all squares are filled, no winner
            return 'draw';
        }

        // if no winner or draw yet
        return null
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


