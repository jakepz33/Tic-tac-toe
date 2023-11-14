

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
    console.log(player1, "NRUHH")
    let playerTurn = player1;

    // const startFirst = () => {
    //     if()
    // }

    //GET UPDATED PLAYER
    const getCurrentPlayerTurn = () => ({...playerTurn}); // how to update a var and return it

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
                if (player1.symbol === board[row][0]) {
                    return player1.name;
                } else if (player2.symbol === board[row][0]) {
                    return player2.name
                }
                // return board[row][0];
            }
        }
        for (let col = 0; col < 3; col++) {
            if (board[0][col] === board[1][col] && board[0][col] === board[2][col] && board[0][col] !== '') {
                if(player1.symbol === board[0][col]) {
                    return player1.name;
                } else if(player2.symbol === board[col][0]) {
                    return player2.name
                }
                // return board[0][col]
            }
        }

        // check for diagonals
        if (board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== '') {
            if (player1.symbol === board[0][0]) {
                return player1.name;
            } else if (player2.symbol === board[0][0]) {
                return player2.name
            }
            // return board[0][0];
        }
        if (board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== '') {
            if (player1.symbol === board[0][2]) {
                return player1.name;
            } else if (player2.symbol === board[0][2]) {
                return player2.name
            }
            // return board[0][2];
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

function ScreenController() {
    // added this one below
    const game = Flow()
    const selectedPlayers = PlayerSelection(game);
    //////
    const gridBoxes = document.querySelectorAll('.grid-box');
    const resetGameButton = document.querySelector('.reset-button')
    const dialog = document.querySelector('dialog');
    dialog.classList.add('dialog-open')
    let h1 = document.createElement("h1");
    let winner;
    dialog.appendChild(h1)


    gridBoxes.forEach((box) => {
        box.addEventListener("click", (event) => {
            if (winner) {
                console.log("Return because winner is True")
                return
            }
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
                    h1.textContent = `${checkForWinner} wins!`
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
        winner = false;
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
            winner = true;
        }
    })

}

function PlayerSelection(gameflow) {
    const player1switch = document.querySelector('#player1-checkbox');
    const player2switch = document.querySelector('#player2-checkbox');
    const startButton = document.querySelector('.startButton');

    let player1Value;
    let player2Value;
    
    let player1span = document.querySelector('#player1span');
    let player2span = document.querySelector('#player2span')

    console.log("GAMEFLOW CHECKIN", gameflow.player1)
    // let player_name = gameflow.player1.name;
    // gameflow.player1.name = "Jake";
    // console.log("CHECK", gameflow.player1)

    console.log(player2switch.checked);
    console.log(player1switch.textContent);
    let player1choice = "X";
    let player2choice = "O"


    // get updated choice
    const get1Choice = () => player1choice;
    const get2Choice = () => player2choice;

    // get updated Name
    const updateName = () => player1Value;
    const update2Name = () => player2Value;

    player1switch.addEventListener("change", function() { // call function to toggle switch 2
        if (player1switch.checked) {
            console.log("Switch is ON")
            player1choice = "O";
            player2choice = "X"
            player2switch.checked = true; // make player 2 X
    
        } else {
            console.log("Switch is OFF")
            player2switch.checked = false;
            player1choice = "X";
            player2choice = "O"
        }
        player1span.textContent = get1Choice();
        player2span.textContent = get2Choice();
        // call function to update VISUAL
    })

    player2switch.addEventListener("change", () => {
        if (player2switch.checked) {
            console.log("Switch is ON for 2")
            player1switch.checked = true;
            player2choice = "X"
            player1choice = "O"
        } else {
            console.log("Switch is OFF")
            player1switch.checked = false;
            player2choice = "O"
            player1choice = "X"
        }
        console.log("get 2 choice", get2Choice())
        player1span.textContent = get1Choice();
        player2span.textContent = get2Choice();
        // call function to update visual
    } )
     startButton.addEventListener("click", () => {
        const player1Input = document.querySelector('#name-input-player1');
        const player2Input = document.querySelector('#name-input-player2')
        // empty value === ""
    
        if (player1Input.value != "") {
            player1Value = player1Input.value;
            console.log("updating name:", updateName())
            gameflow.player1.name = updateName();
            gameflow.player1.symbol = get1Choice();
            console.log('New Name:', gameflow.player1.name)
            
        }
        if (player2Input.value != "") {
            player2Value = player2Input.value;
            gameflow.player2.name = update2Name();
            gameflow.player2.symbol = get2Choice();
            console.log('New Name:', gameflow.player2.name)
            

        }

        const startScreen = document.getElementById('start-screen');
        const gameboardContainer = document.getElementById('gameboard-container');
        startScreen.style.display = 'none';
        gameboardContainer.style.display = '';

        gameflow.player1.symbol = get1Choice();
        gameflow.player2.symbol = get2Choice();

        console.log(get1Choice())
        if(get1Choice() === "O") {
            gameflow.switchTurns();
        } else {
            gameflow.playerTurn = gameflow.player1;
        }
        
        console.log('NEW SYMBOL 1', gameflow.getCurrentPlayerTurn())
        console.log('NEW SYMBOL 2', gameflow.player2.symbol)

        // hide this display and show the gameboard

        // console.log("updating name:", updateName())
        // console.log(update2Name())


    })

    return {
        get1Choice,
        get2Choice,
        updateName,
        update2Name,
    }
        
}

// playerSelection();
// const dialog = document.querySelector("dialog")
// dialog.showModal();
// function to add content to the screen
ScreenController();
