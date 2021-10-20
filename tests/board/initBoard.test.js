
const assert = require("assert");
const Board = require("../../public/classes/Board").Board;

// ---> inital Data object
const initalData = {"dimension": 24, "nbColors": 3, "grid": []};
// initialized board
const board = new Board(initalData.dimension, initalData.nbColors, initalData.grid);

// ----> start tests 
describe('board initial state', function() {
  
    it(`dimension correctly initialized to ${board.dimension} `, function() {
        assert.strictEqual(board.dimension, initalData.dimension);
    });    
    it(`nbColors correctly initialized to ${board.nbColors} `, function() {
        assert.strictEqual(board.nbColors, initalData.nbColors);
    });    
    
    it(`grid initialized randomly, so different from ${initalData.grid} `, function() {
        expect(board.grid !== initalData.grid)
    });
});  
