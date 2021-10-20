
const assert = require("assert");
const Board = require("../../public/classes/Board").Board;
const Game = require("../../public/classes/Game").Game;
const gameInstance = require("../../public/classes/Game").gameInstance;

// ---> inital Data object
const initalData = {"dimension": 24, "nbColors": 3, "grid": []};
// initialized game
const game = gameInstance;

// ----> start tests 
describe('game signleton ensured', function() {
    
    const board = new Board(initalData.dimension, initalData.nbColors, initalData.grid);
    game.board = board;

    it(`only one game instance is allowed by gameInstance`, function() {
        assert.strictEqual(game, gameInstance);
    });    
    
    it(`only one game instance is allowed by Game.Instance`, function() {
        assert.strictEqual(game, Game.Instance);
    });  

    it(`Game successfully initialized with  ${board.format()}`, function() {
        // the game format should have the same board description
        expect(game.format().includes(board.format()));
    });    
    
    
});  
