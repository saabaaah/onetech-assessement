
const assert = require("assert");
const Board = require("../../public/classes/Board").Board;
const Position = require("../../public/classes/Board").Position;
const Tile = require("../../public/classes/Board").Tile;
const Color = require("../../public/classes/Board").Color;
const COLOR_HEX = require("../../public/classes/Board").COLOR_HEX;
const Game = require("../../public/classes/Game").Game;
const gameInstance = require("../../public/classes/Game").gameInstance;

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
        grid[i].push(new Tile(new Color(COLOR_HEX.indexOf(colorsGrid[i][j]), colorsGrid[i][j]), new Position(i, j)));
    }
}
const initalData = {"dimension": 6, "nbColors": 3, "grid": grid};
// initialized game
const game = gameInstance;

// ----> start tests 
describe('game as in given example', function() {
    
    const board = new Board(initalData.dimension, initalData.nbColors, initalData.grid);
    game.board = board;
    //game.startGame();

    it(`The board has one single color`, function() {
        // at the end, the game board is colored all in one color only.
        //game.startGame();

        let i = Math.floor(Math.random()*board.dimension);
        let j = Math.floor(Math.random()*board.dimension);
        //console.log("i,j : ", i, j);
        let i_color = COLOR_HEX.indexOf(board.grid[i][j].color.code);
        console.log("colors : ", board);
        expect(i_color == board.activeColor.code);
    });   

});  
