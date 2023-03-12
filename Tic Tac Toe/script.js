const cells = document.querySelectorAll(".cell");
const message = document.querySelector("#message");
const resetButton = document.querySelector("#reset-button");
const singlePlayerButton = document.querySelector("#single-player-button");
let currentPlayer = "X";
let gameStatus = "Game on!";
let isSinglePlayer = false;

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function () {
    if (cells[i].textContent !== "" || gameStatus === "Game over!") {
      return;
    }

    cells[i].textContent = currentPlayer;

    if (checkWin()) {
      message.textContent = "Player " + currentPlayer + " wins!";
      gameStatus = "Game over!";
      return;
    }

    if (checkDraw()) {
      message.textContent = "It's a draw!";
      gameStatus = "Game over!";
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = "Player " + currentPlayer + "'s turn.";

    if (isSinglePlayer && currentPlayer === "O" && gameStatus === "Game on!") {
      setTimeout(makeSinglePlayerMove, 1000);
    }
  });
}

resetButton.addEventListener("click", function () {
  reset();
});

singlePlayerButton.addEventListener("click", function () {
  isSinglePlayer = true;
});

function makeSinglePlayerMove() {
  const emptyCells = [];

  for (let i = 0; i < cells.length; i++) {
    if (cells[i].textContent === "") {
      emptyCells.push(i);
    }
  }

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const randomCell = cells[emptyCells[randomIndex]];
  randomCell.textContent = "O";

  if (checkWin()) {
    message.textContent = "Player O wins!";
    gameStatus = "Game over!";
    return;
  }

  if (checkDraw()) {
    message.textContent = "It's a draw!";
    gameStatus = "Game over!";
    return;
  }

  currentPlayer = "X";
  message.textContent = "Player " + currentPlayer + "'s turn.";
}

function checkWin() {
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

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (
      cells[a].textContent === "" ||
      cells[b].textContent === "" ||
      cells[c].textContent === ""
    ) {
      continue;
    }

    if (
      cells[a].textContent === cells[b].textContent &&
      cells[b].textContent === cells[c].textContent
    ) {
      return true;
    }
  }

  return false;
}

function checkDraw() {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].textContent === "") {
      return false;
    }
  }

  return true;
}

function reset() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
  }

  currentPlayer = "X";
  gameStatus = "Game on!";
  isSinglePlayer = false;
  message.textContent = "Player " + currentPlayer + "'s turn.";
}

function computerMove() {
  const availableCells = [];
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].textContent === "") {
      availableCells.push(i);
    }
  }

  const randomIndex = Math.floor(Math.random() * availableCells.length);
  const randomCell = availableCells[randomIndex];

  cells[randomCell].textContent = currentPlayer;

  if (checkWin()) {
    message.textContent = "You lose!";
    gameStatus = "Game over!";
    return;
  }

  if (checkDraw()) {
    message.textContent = "It's a draw!";
    gameStatus = "Game over!";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent = "Player " + currentPlayer + "'s turn.";
}

function computerPlay() {
  if (currentPlayer === "O" && gameStatus === "Game on!") {
    setTimeout(computerMove, 1000);
  }
}

resetButton.addEventListener("click", function () {
  reset();
});

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function () {
    if (cells[i].textContent !== "" || gameStatus !== "Game on!") {
      return;
    }
    cells[i].textContent = currentPlayer;

    if (checkWin()) {
      message.textContent = "Player " + currentPlayer + " wins!";
      gameStatus = "Game over!";
      return;
    }

    if (checkDraw()) {
      message.textContent = "It's a draw!";
      gameStatus = "Game over!";
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = "Player " + currentPlayer + "'s turn.";
    computerPlay();
  });
}
