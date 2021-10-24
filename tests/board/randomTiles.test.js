
const assert = require("assert");
const Board = require("../../public/classes/Board").Board;
const COLOR_HEX = require("../../public/classes/Board").COLOR_HEX;

// ---> inital Data object
const initalData = {"dimension": 6, "nbColors": 3, "grid": []};
// initialized board
const board = new Board(initalData.dimension, initalData.nbColors, initalData.grid);

// ----> start tests 
describe('board initial state', function() {
  
    it(`dimension correctly initialized to ${board.grid.length} `, function() {
        assert.strictEqual(board.grid.length, initalData.dimension);
    });    
    it(`colors correctly initialized to ${board.nbColors} `, function() {
        // no matter which case is chosen randomly, the color should be in the first nbColors of COLOR_HEX
        let i = Math.floor(Math.random()*board.dimension);
        let j = Math.floor(Math.random()*board.dimension);
        //console.log("i,j : ", i, j);
        let i_color = COLOR_HEX.indexOf(board.grid[i][j].color);
        //console.log("colors : ", i_color);
        expect(i_color <= initalData.nbColors);
    });    
    
    it(`grid initialized randomly each time`, function() {
        let initState = board.grid[0][0];
        // reset board
        board.init();
        expect(board.grid[0][0] != initState);
    });
});  
