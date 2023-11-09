

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
            board[one][two] = playerSymbol; // this is where the board updates array
            return "Success"
        }
        // 
    }
    
    const printGame = () => {
        // f
    }

    // GameBoard Return Statement
    return {
        board,
        updateBoard,
    }
}

function Flow(player1Name = "Player1", player2Name = "Player2") {
    const player1 = Player(player1Name, 'X');
    const player2 = Player(player2Name, 'O');
    const myBoard = GameBoard()
    let playerTurn = player1

    //GET UPDATED PLAYER
    const getCurrentPlayerTurn = () => playerTurn; // how to update a var and return it

    const showPlayers = () => {
        return [player1, player2]
    }

    //SWITCHTURNS
    const switchTurns = () => { // switches players turn
        playerTurn = playerTurn === player1 ? player2 : player1;
    }

    //MAKEMOVE
    const makeMove = (index1, index2) => {
        // should change the value of the index
        const moveResult = myBoard.updateBoard(index1, index2, playerTurn.symbol);
        let gameResult = null;
        const updateResult = () => gameResult;

        if (moveResult === "Success") {
            //switchTurns()
            console.log('Valid move') // add content to the DOM
            gameResult = checkWinner(myBoard.board);
            if (gameResult) {
                if (gameResult === "draw") {
                    console.log("It's a draw!");
                } else {
                    console.log(`${gameResult} wins`);
                }
            }
        } else {
            console.log('Invalid move, try again.')
        }
        return {moveResult, gameResult, updateResult}   
    }

    //RESETGAME
    const resetGame = () => {
        // Clear the game board by resetting each cell to an empty string
        for (let row = 0; row < myBoard.board.length; row++) {
            for (let col = 0; col < myBoard.board[row].length; col++) {
                myBoard.board[row][col] = '';
            }
        }
        playerTurn = player1;
    }

    //CHECKFORWINNER
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
        player1,
        player2,
        playerTurn,
        showPlayers,
        myBoard,
        makeMove,
        resetGame,
        getCurrentPlayerTurn,
        switchTurns,
    }
}



// newGame.makeMove(1, 1); // X
// newGame.makeMove(2, 0); // O
// console.log(newGame.myBoard.board)
// newGame.makeMove(1, 0); // X
// newGame.makeMove(2, 1); // O

function screenController() {
    const game = Flow()
    const gridBoxes = document.querySelectorAll('.grid-box');
    const resetGameButton = document.querySelector('.reset-button')
    const dialog = document.querySelector('dialog');
    dialog.classList.add('dialog-open')
    let h1 = document.createElement("h1");
    dialog.appendChild(h1)


    gridBoxes.forEach((box) => {
        box.addEventListener("click", (event) => {
            const clickedBox = event.target;
            const row = clickedBox.dataset.row;
            const col = clickedBox.dataset.col;

            // check for valid move
            const myMove = game.makeMove(row, col);
            if(myMove.moveResult === "Success") {
                const symbol = game.getCurrentPlayerTurn().symbol; // get X or O
                clickedBox.textContent = symbol; // add to DOM
                console.log("Game result", myMove.gameResult) // if doesnt work -> updateResult()
                console.log("Updated Board", game.myBoard.board)
                let checkForWinner = myMove.gameResult;
                if (checkForWinner != null && checkForWinner != "draw") {
                    console.log(checkForWinner, "is the winner!")
                    // let h1 = document.createElement('h1')
                    h1.textContent = `Player ${checkForWinner} wins!`
                    // dialog.appendChild(h1);
                    dialog.showModal()
                } else if (checkForWinner != null && checkForWinner === "draw") {
                    h1.textContent = `It's a ${checkForWinner}!`;
                    dialog.showModal();
                }
                game.switchTurns();
            }
        })
    })

    resetGameButton.addEventListener("click", () => {
        const mySquares = document.querySelectorAll('.gameboard .grid-box');
        mySquares.forEach(square => {
            square.textContent = '';
        })
    
        console.log("Hello World")
        game.resetGame()
        console.log("Reset Button", game.myBoard.board);
    })

    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
            h1.textContent = "";
        }
    })

}
// const dialog = document.querySelector("dialog")
// dialog.showModal();
// function to add content to the screen
screenController();
