
// load game data
function loadGameHTML(){
    let gameDiv = document.getElementById("game");
    gameDiv.innerHTML = game.toHtml() + 
                        "<button class=\"btn-play\" id=\"btn-play\" onclick=\"playGame()\"> play </button>";
}

// start a play on the game 
function playGame(){
    game.play();
    loadGameHTML();
}

// ---> inital Data object
const colorsGrid = [
    ["RED",     "ORANGE",   "RED",      "BLUE",     "RED",      "ORANGE"],
    ["BLUE",    "RED",      "BLUE",     "ORANGE",   "BLUE",     "ORANGE"],
    ["BLUE",    "BLUE",     "ORANGE",   "BLUE",     "BLUE",     "BLUE"],
    ["BLUE",    "ORANGE",   "RED",      "BLUE",     "RED",      "ORANGE"],
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


// load game 
loadGameHTML();