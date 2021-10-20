
// TODO set a User interface to represent the game !



// ---> inital Data object
const colorsGrid = [
    ["RED",     "ORANGE",   "RED",      "BlUE",     "RED",      "ORANGE"],
    ["BLUE",    "RED",      "BLUE",     "ORANGE",   "BLUE",     "ORANGE"],
    ["BLUE",    "BLUE",     "ORANGE",   "BLUE",     "BLUE",     "BLUE"],
    ["BLUE",    "ORANGE",   "RED",      "BlUE",     "RED",      "ORANGE"],
    ["BLUE",    "ORANGE",   "RED",      "ORANGE",   "ORANGE",   "ORANGE"],
    ["RED",     "BLUE",     "RED",      "ORANGE",   "BLUE",     "RED"],
];

const grid = [];
for (let i = 0; i < colorsGrid.length; i++) {
    grid.push([]);
    for (let j = 0; j < colorsGrid[i].length; j++) {
        grid[i].push(new Tile(colorsGrid[i][j], new Position(i, j)));
    }
}
const initalData = {"dimension": 6, "nbColors": 3, "grid": grid};
// initialized game
const game = gameInstance;
//game.startGame()

let gameDiv = document.getElementById("game");
gameDiv.innerHTML = "Welcome to the game, please run 'npm test' to see the test results!";

