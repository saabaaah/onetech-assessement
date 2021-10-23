

// ------------- Class : Game  -------------- //
class Game{
    // ----- attributes ----- //
    static _instance;
    _board;
    _connectedSet = [];
    _actualColor;
    _nbMoves = 0;
    // ----- constructor ----- //
    constructor(){
        try{
            // attemt to import the file
            const Board = require("./Board.js").Board;
            this._board = new Board();  // init with default values    
        }catch(ex){
            this._board = new Board();
        }
        this._actualColor = this._board.activeColor;
    }

    // ----- public methods ----- //
    static get Instance(){
        return this._instance || (this._instance = new this());
    }
    
    // start the game , 
    startGame(){
        // start playing until the board is filled
        while (! this._board.isFull()) {
            this.play();
        }
    }

    // play a single tour
    play(){
        this._actualColor = this._board.move();
        this._nbMoves ++;
    }

    set board(board){
        // set  board data, with given board
        this._board = board;
        this._actualColor = this._board.activeColor;
    }

    set connectedSet(connectedSet){ this._connectedSet = connectedSet}

    // ----- toString ----- //
    format(){
        return `Game : [ ${this._board.format()} ]`;
    }
    toHtml(){
        return "<h3>AUTOPLAYEDGAME | DIMENSION: "+this._board.dimension+" | NB_COLORS: "+this._board.nbColors+" | ACTIVE COLOR: "+this._actualColor.toHtml()+" | MOVES: "+this._nbMoves+"</h3>"
                +"<div class=\"game-board\" >"+this._board.toHtml()+"</div>";
    }
}

// get the instance
const gameInstance = Game.Instance;

exports.Game = Game;
exports.gameInstance = gameInstance;