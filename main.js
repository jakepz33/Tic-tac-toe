//  Player Object
const Player = (name, symbol) => {
  return {
    name,
    symbol,
  };
};

// Gameboard Object
function GameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const updateBoard = (one, two, playerSymbol) => {
    // make index become value of Player, X or O
    // ** check to see if index is taken **
    if (one >= rows || two >= columns) {
      return "Failure";
    } else if (board[one][two] !== "") {
      return "Failure"; // player switch doesn't happen
    } else {
      board[one][two] = playerSymbol; // this is where the board updates array and triggers player switch.
      return "Success";
    }
  };

  // GameBoard Return Statement
  return {
    board,
    updateBoard,
  };
}

// Flow of Game Object
function Flow(player1Name = "Player1", player2Name = "Player2") {
  const player1 = Player(player1Name, "X");
  const player2 = Player(player2Name, "O");
  const myBoard = GameBoard();
  let playerTurn = player1;

  //GET UPDATED PLAYER
  const getCurrentPlayerTurn = () => playerTurn; // how to update a var and return it

  const showPlayers = () => {
    return [player1, player2];
  };

  //SWITCHTURNS
  const switchTurns = () => {
    playerTurn = playerTurn === player1 ? player2 : player1;
  };

  //MAKEMOVE
  const makeMove = (index1, index2) => {
    const moveResult = myBoard.updateBoard(index1, index2, playerTurn.symbol);
    let gameResult = null;
    const updateResult = () => gameResult;

    if (moveResult === "Success") {
      //switchTurns()
      console.log("Valid move"); // add content to the DOM
      gameResult = checkWinner(myBoard.board);
      if (gameResult) {
        if (gameResult === "draw") {
          console.log("It's a draw!");
        } else {
          console.log(`${gameResult} wins`);
        }
      }
    } else {
      console.log("Invalid move, try again.");
    }
    return { moveResult, gameResult, updateResult };
  };

  //RESETGAME
  const resetGame = () => {
    // Clear the game board by resetting each cell to an empty string
    for (let row = 0; row < myBoard.board.length; row++) {
      for (let col = 0; col < myBoard.board[row].length; col++) {
        myBoard.board[row][col] = "";
      }
    }
    switchTurns();
  };

  //CHECKFORWINNER
  const checkWinner = (board) => {
    // for 3 in a row
    for (let row = 0; row < 3; row++) {
      if (
        board[row][0] === board[row][1] &&
        board[row][0] == board[row][2] &&
        board[row][0] !== "" // if row 0 is not empty
      ) {
        if (player1.symbol === board[row][0]) {
          return player1.name;
        } else if (player2.symbol === board[row][0]) {
          return player2.name;
        }
      }
    }

    // for 3 in a column
    for (let col = 0; col < 3; col++) {
      if (
        board[0][col] === board[1][col] &&
        board[0][col] === board[2][col] &&
        board[0][col] !== ""
      ) {
        if (player1.symbol === board[0][col]) {
          return player1.name;
        } else if (player2.symbol === board[0][col]) {
          return player2.name;
        }
      }
    }

    // check for diagonals
    if (
      board[0][0] === board[1][1] &&
      board[0][0] === board[2][2] &&
      board[0][0] !== ""
    ) {
      if (player1.symbol === board[0][0]) {
        return player1.name;
      } else if (player2.symbol === board[0][0]) {
        return player2.name;
      }
    }
    if (
      board[0][2] === board[1][1] &&
      board[0][2] === board[2][0] &&
      board[0][2] !== ""
    ) {
      if (player1.symbol === board[0][2]) {
        return player1.name;
      } else if (player2.symbol === board[0][2]) {
        return player2.name;
      }
    }

    // check for DRAW
    let isDraw = true;
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === "") {
          // checks if all squares are filled.
          isDraw = false; // changes to false -> break
          break;
        }
      }
    }
    if (isDraw) {
      // all squares are filled, no winner
      return "draw";
    }

    // if no winner or draw yet
    return null;
  };

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
  };
}

function ScreenController() {
  const game = Flow();
  const selectedPlayers = PlayerSelection(game);

  const gridBoxes = document.querySelectorAll(".grid-box");
  const resetGameButton = document.querySelector(".reset-button");
  const dialog = document.querySelector("dialog");
  dialog.classList.add("dialog-open");
  let h1 = document.createElement("h1");
  let winner;
  dialog.appendChild(h1);

  // listen to each grid box square
  gridBoxes.forEach((box) => {
    box.addEventListener("click", (event) => {
      if (winner) {
        return;
      }

      const clickedBox = event.target;
      const row = clickedBox.dataset.row;
      const col = clickedBox.dataset.col;

      // check for valid move
      const myMove = game.makeMove(row, col);
      if (myMove.moveResult === "Success") {
        const symbol = game.getCurrentPlayerTurn().symbol; // get X or O
        clickedBox.textContent = symbol; // add to DOM
        console.log("Game result", myMove.gameResult); // if doesnt work -> updateResult()
        let checkForWinner = myMove.gameResult;
        if (checkForWinner != null && checkForWinner != "draw") {
          console.log(checkForWinner, "is the winner!");
          h1.textContent = `${checkForWinner} wins!`;
          dialog.showModal();
        } else if (checkForWinner != null && checkForWinner === "draw") {
          h1.textContent = `It's a ${checkForWinner}!`;
          dialog.showModal();
        }
        game.switchTurns();
      }
    });
  });

  resetGameButton.addEventListener("click", () => {
    const mySquares = document.querySelectorAll(".gameboard .grid-box");
    winner = false;
    mySquares.forEach((square) => {
      square.textContent = "";
    });
    game.resetGame();
    game.switchTurns();
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
      h1.textContent = "";
      winner = true;
    }
  });
}

function PlayerSelection(gameflow) {
  const player1switch = document.querySelector("#player1-checkbox");
  const player2switch = document.querySelector("#player2-checkbox");
  const startButton = document.querySelector(".startButton");

  let player1Value;
  let player2Value;

  let player1span = document.querySelector("#player1span");
  let player2span = document.querySelector("#player2span");

  let player1choice = "X";
  let player2choice = "O";

  // get updated choice
  const get1Choice = () => player1choice;
  const get2Choice = () => player2choice;

  // get updated Name
  const updateName = () => player1Value;
  const update2Name = () => player2Value;

  player1switch.addEventListener("change", function () {
    // call function to toggle switch 2
    if (player1switch.checked) {
      player1choice = "O";
      player2choice = "X";
      player2switch.checked = true; // make player 2 X
    } else {
      console.log("Switch is OFF");
      player2switch.checked = false;
      player1choice = "X";
      player2choice = "O";
    }
    player1span.textContent = get1Choice();
    player2span.textContent = get2Choice();
  });

  player2switch.addEventListener("change", () => {
    if (player2switch.checked) {
      console.log("Switch is ON for 2");
      player1switch.checked = true;
      player2choice = "X";
      player1choice = "O";
    } else {
      console.log("Switch is OFF");
      player1switch.checked = false;
      player2choice = "O";
      player1choice = "X";
    }
    console.log("get 2 choice", get2Choice());
    player1span.textContent = get1Choice();
    player2span.textContent = get2Choice();
  });

  startButton.addEventListener("click", () => {
    const player1Input = document.querySelector("#name-input-player1");
    const player2Input = document.querySelector("#name-input-player2");

    if (player1Input.value != "") {
      player1Value = player1Input.value;
      console.log("updating name:", updateName());
      gameflow.player1.name = updateName();
      gameflow.player1.symbol = get1Choice();
      console.log("New Name:", gameflow.player1.name);
    }
    if (player2Input.value != "") {
      player2Value = player2Input.value;
      gameflow.player2.name = update2Name();
      gameflow.player2.symbol = get2Choice();
      console.log("New Name:", gameflow.player2.name);
    }

    const startScreen = document.getElementById("start-screen");
    const gameboardContainer = document.getElementById("gameboard-container");
    startScreen.style.display = "none";
    gameboardContainer.style.display = "";

    gameflow.player1.symbol = get1Choice();
    gameflow.player2.symbol = get2Choice();

    console.log("Get 1 Choice:", get1Choice());
    if (get1Choice() === "O") {
      gameflow.switchTurns();
    } else {
      gameflow.playerTurn = gameflow.player1;
    }

    console.log("NEW SYMBOL 1", gameflow.getCurrentPlayerTurn());
    console.log("NEW SYMBOL 2", gameflow.player2.symbol);
  });

  return {
    get1Choice,
    get2Choice,
    updateName,
    update2Name,
  };
}

ScreenController();
