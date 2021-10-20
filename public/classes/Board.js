// ------------ Class : Board ------------ //
class Board{

    // -----  attributes ----- //
     _dimension;
     _nbColors;
     _grid;
     _activeColor;
     _activeTiles = []; // active tiles connected

    // ----- constructor ----- //
    constructor(dimension=6, nbColors=3, grid = []){
        // possible default values for a board are those given in the description [6*3]
        this._dimension = dimension;
        this._nbColors = nbColors;
        this._grid = grid;
        // if grid is empty, init grid randomly
        if(grid.length == 0)
            this.init();

        // take the upper left Tile position as active tile, and its color as the activeColor
        this._activeTiles.push(this._grid[0][0].position);
        this._activeColor = this._grid[0][0].color;
        
    }

    // ----- toString ----- //
    format(){
        return `Board : [dim=${this._dimension}, nbColors=${this._nbColors} , Color=${this._activeColor}, nbActiveTiles=${this._activeTiles.length}  ]`;
    }

    // ----- getters ----- //
    get dimension(){ return this._dimension; }
    get nbColors(){ return this._nbColors; }
    get grid(){ return this._grid; }
    get activeColor(){ return this._activeColor; }

    // ----- setters ----- //
    set dimension(value) { this._dimension = value; }    
    set nbColors(value) { this._nbColors = value; }    
    set grid(value) { this._grid = value; }
    set activeColor(value) { this._activeColor = value; }


    // ----- methods ----- //
    init(){
        // init boad randomly
        for (let i = 0; i < this._dimension; i++) {
            this._grid.push([]);

            for (let j = 0; j < this._dimension; j++) {
                // choose random position color
                const pos = Math.floor(Math.random() * this._nbColors);
                this._grid[i].push(new Tile(COLOR_HEX[pos], new Position(i, j)));
            }
        }
    }

    move(){
        // play a move, & return the chosen color 
        let concernedTiles = [];
        COLOR_HEX.array.forEach(element => { concernedTiles.push({"occ":0, "listPos":[]}) });

        // recursive function to check connected tiles
        function computeColor(pos){
            const neighbors = this._getTileNeighborsOfColor(pos, this._grid[pos.x][pos.y].color);
            if (neighbors.length == 0){
                return;
            }else{
                neighbors.forEach((element) => computeColor(element.position));
            }
        }


        let chosen = "";
        for (let i = this._activeTiles.length - 1; i >= 0; i--) {
            const neighbors = this._getTileNeighbors(this._activeTiles[i].position);
            for (let neigh = 0; neigh < neighbors.length; neigh++) {
                // TODO --> computeColor call           
            }

        }
        // update the origin tiles that are connected 
        for (let i = this._activeTiles.length - 1; i >= 0; i--) {
            // TODO : Update new activeTiles list & Update their color to the chosen one
        }

        return chosen;
    }

    // get Tile neiphborhood
    _getTileNeighbors(pos){
        let listNeighbors = [];
        // check if neighbors exist (not out of borders)
        try{ listNeighbors.push(this._grid[pos.x-1][y]); }catch(ex){}
        try{ listNeighbors.push(this._grid[pos.x+1][y]); }catch(ex){}
        try{ listNeighbors.push(this._grid[pos.x][y-1]); }catch(ex){}
        try{ listNeighbors.push(this._grid[pos.x][y+1]); }catch(ex){}
        return listNeighbors;
    }

    // get Tile neiphborhood having the given color
    _getTileNeighborsOfColor(pos, color){
        let listNeighbors = this._getTileNeighbors(pos);        
        return listNeighbors.filter((pos) => this._grid[pos.x][pos.y].color === color);
    }    
    // get Tile neiphborhood having only different color
    _getTileNeighborsOfDifferentColor(pos, color){
        let listNeighbors = this._getTileNeighbors(pos);        
        return listNeighbors.filter((pos) => this._grid[pos.x][pos.y].color != color);
    }
}


// ------------ Class : Tile ------------ //
class Tile{
    // -----  attributes ----- //
    _color;
    _position; 

    // ----- constructors ----- //
    constructor(color, position){
        this._color = color;
        this._position = position;
    }
    // ----- getters ----- //
    get color(){ return this._color; }
    get position(){ return this._position; }

    // ----- setters ----- //
    set color(value) { this._color = value; }    
    set position(value) { this._position = value; }
}

// ------------ Class : Position ------------ //
class Position{
    // -----  attributes ----- //
    _x;
    _y;
    // ----- constructors ----- //
    constructor(x, y){
        this._x = x;
        this._y = y;
    }
    // ----- getters ----- //
    get x(){ return this._x; }
    get y(){ return this._y; }

    // ----- setters ----- //
    set x(value) { this._x = value; }    
    set y(value) { this._y = value; }

}

// ------------ Class : Color ------------ //
class Color{
    // -----  attributes ----- //
    _rank;
    _code_HEX;
    // ----- constructors ----- //
    constructor(rank, code_HEX){
        this._rank = rank;
        this._code = code;
    }
    // ----- getters ----- //
    get rank(){ return this._rank; }
    get code(){ return this._code; }

    // ----- setters ----- //
    set rank(value) { this._rank = value; }    
    set code(value) { this._code = value; }
}

// ------------ COLOR_HEX : List of colors ------------ //
const COLOR_HEX = ["RED",
 "ORANGE",
 "YELLOW",
 "GREEN",
 "BLUE",
 "INDIGO",
 "VIOLET",
 "PURPLE"
];

exports.Board = Board;
exports.Tile = Tile;
exports.Color = Color;
exports.Position = Position;
exports.COLOR_HEX = COLOR_HEX;
