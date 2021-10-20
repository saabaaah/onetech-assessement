
const assert = require("assert");
const Board = require("../../public/classes/Board").Board;
const Position = require("../../public/classes/Board").Position;
const Tile = require("../../public/classes/Board").Tile;
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
        grid[i].push(new Tile(colorsGrid[i][j], new Position(i, j)));
    }
}
const initalData = {"dimension": 6, "nbColors": 3, "grid": grid};
// initialized game
const game = gameInstance;

// ----> start tests 
describe('game as in given example', function() {
    
    const board = new Board(initalData.dimension, initalData.nbColors, initalData.grid);
    game.board = board;

    it(`first set should include the upper left tile`, function() {
        let position = board.grid[0][0].position;
        expect(board.activeTiles.includes(position));
    });   

    it(`first move should decide on "BLUE" color`, function() {
        assert.deepEqual(board.move(), "BLUE");
    });
    it(`second move should decide on "ORANGE" color`, function() {
        assert.deepEqual(board.move(), "ORANGE");
    });
    it(`third move should decide on "RED" color`, function() {
        assert.deepEqual(board.move(), "RED");
    });
    it(`fourth move should decide on "BLUE" color`, function() {
        assert.deepEqual(board.move(), "BLUE");
    });

});  
