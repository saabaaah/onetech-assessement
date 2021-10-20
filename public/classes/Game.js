

// ------------- Class : Game -> Sigleton -------------- //
class Game{
    // ----- attributes ----- //
    static _instance;
    _board;
    

    // ----- constructor ----- //
    constructor(){
        try{
            // attemt to import the file
            const Board = require("./Board.js").Board;
            this._board = new Board();  // init with default values    
        }catch(ex){
            this._board = new Board();
        }
    }

    // ----- public methods ----- //
    static get Instance(){
        return this._instance || (this._instance = new this());
    }
    
    // start the game , 
    startGame(){
        // start playing ...

    }

    set board(board){
        // set  board data, with given board
        this._board = board;
    }

    // ----- toString ----- //
    format(){
        return `Game : [ ${this._board.format()} ]`;
    }
}
// get the instance
const gameInstance = Game.Instance;

exports.Game = Game;
exports.gameInstance = gameInstance;