

const mainBoard = new Board(6, 3, []);

gameInstance.board = mainBoard;

console.log("mainBoard : ", mainBoard.format(), gameInstance.format());

let gameDiv = document.getElementById("game");

gameDiv.innerHTML = "Welcome to the game, please run 'npm test' to see the test results!";

