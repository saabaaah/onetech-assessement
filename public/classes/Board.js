
// ------------ COLOR_HEX : List of colors ------------ //
const COLOR_HEX = ["RED", "ORANGE", "YELLOW", "GREEN", "BLUE", "INDIGO", "VIOLET", "PURPLE"];

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
        // add all tiles that are neighbors to the 0,0 having the same color
        let tmpActive = this._getTileNeighborsOfColor(this._grid[0][0].position, this._grid[0][0].color.code);
        this._activeTiles = this._activeTiles.concat(tmpActive.map((tile) => tile.position));
        this._activeColor = this._grid[0][0].color;
        
    }

    // ----- toString ----- //
    format(){
        return `Board : [dim=${this._dimension}, nbColors=${this._nbColors}, Color=${this._activeColor}, nbActiveTiles=${this._activeTiles.length}  ]`;
    }

    // ----- getters ----- //
    get dimension(){ return this._dimension; }
    get nbColors(){ return this._nbColors; }
    get grid(){ return this._grid; }
    get activeColor(){ return this._activeColor; }
    get activeTiles(){ return this._activeTiles; }

    // ----- setters ----- //
    set dimension(value) { this._dimension = value; }    
    set nbColors(value) { this._nbColors = value; }    
    set grid(value) { this._grid = value; }
    set activeColor(value) { this._activeColor = value; }
    set activeTiles(value) { this._activeTiles = value; }


    // ----- methods ----- //
    init(){
        // init boad randomly
        for (let i = 0; i < this._dimension; i++) {
            this._grid.push([]);

            for (let j = 0; j < this._dimension; j++) {
                // choose random position color
                const pos = Math.floor(Math.random() * this._nbColors);
                this._grid[i].push(new Tile(new Color(pos, COLOR_HEX[pos]), new Position(i, j)));
            }
        }
    }

    move(){
        // play a move, & return the chosen color 
        let concernedTiles = {};
        var treatedTiles = [...this._activeTiles];

        COLOR_HEX.forEach(element => { concernedTiles[element] = {
                                                            "occ":0, 
                                                            "listPos":[]
                                                            }});
        let self = this;
        // recursive function to check connected tiles
        //console.log("out treatedTiles:", treatedTiles.length);
        function computeColor(pos){
            let tmp_tile = self._grid[pos.x][pos.y];
            const neighbors = self._getTileNeighborsOfColor(pos, self._grid[pos.x][pos.y].color.code);
            //console.log("inside -> treatedTiles:", treatedTiles.length);

            // check if this position is already treated
            if(treatedTiles.filter(e => e.x === pos.x && e.y == pos.y).length > 0){
                return;
            }
            // mark this tile as treated
            try{
                treatedTiles.push(tmp_tile.position);
                concernedTiles[tmp_tile.color.code]["occ"] ++;
                concernedTiles[tmp_tile.color.code]["listPos"].push(tmp_tile.position);
            }catch (ex){
                console.log("PROBLEM UPDATING LIST...", ex);
            }

            // check for neiphbors 
            if (neighbors.length == 0){
                return;
            }else{
                // check each neighbor
                for (let i_neigh = 0; i_neigh < neighbors.length; i_neigh++) {
                    const element = neighbors[i_neigh];
                    if (treatedTiles.filter(e => e.x === element.position.x && e.y == element.position.y).length == 0){
                        computeColor(element.position) 
                    }
                }
            }
        }
        for (let i_tile = this._activeTiles.length - 1; i_tile >= 0; i_tile--) {
            const position = this._activeTiles[i_tile];
            const neighbors = this._getTileNeighborsOfDifferentColor(
                                                    position,
                                                    this._grid[position.x][position.y].color.code);

            for (let i_neighbor = 0; i_neighbor < neighbors.length; i_neighbor++) {
                // TODO --> computeColor call  
                computeColor(neighbors[i_neighbor].position);    
            }
        }

        // choose color with max occurence value in the concernedTiles
        let arrConcernedTiles = Object.keys( concernedTiles ).map(function ( key ) { return concernedTiles[key]["occ"]; });

        let maxValue = Math.max(... arrConcernedTiles);
        let colorRank = arrConcernedTiles.indexOf(maxValue);
        let chosen = COLOR_HEX[colorRank];
        //console.log("out treatedTiles:", treatedTiles.length, " maxValue : ", maxValue, "chosen: ", chosen);
        //console.log("out this.activeTiles:", this.activeTiles, this.activeTiles.length);

        // update the origin tiles that are connected 
        for (let i = this._activeTiles.length - 1; i >= 0; i--) {
            // TODO : Update new activeTiles list & Update their color to the chosen one
            for (let i_tile = 0; i_tile < concernedTiles[chosen]["listPos"].length; i_tile++) {
                let pos = concernedTiles[chosen]["listPos"][i_tile];
                if (this._activeTiles.filter(
                                    e => e.x === pos.x 
                                    && e.y == pos.y
                                ).length == 0){
                    this._activeTiles.push(pos);
                }
            }
        }
        // update active tiles colors
        for (let i = 0; i < this._activeTiles.length; i++) {
            let pos = this._activeTiles[i];
            // change this Tile's color on the grid
            this.grid[pos.x][pos.y].color = new Color(colorRank, chosen);
            //console.log(pos, " -->", chosen, this._activeTiles.length);
        }

        this.activeColor = new Color(colorRank, chosen);
                    
        // return the chosen color as a Color Object
        return this.activeColor;
    }

    // get Tile neiphborhood
    _getTileNeighbors(pos){
        let listNeighbors = [];
        // check if neighbors exist (not out of borders)
        try{ listNeighbors.push(this._grid[pos.x-1][pos.y]); }catch(ex){}
        try{ listNeighbors.push(this._grid[pos.x+1][pos.y]); }catch(ex){}
        try{ listNeighbors.push(this._grid[pos.x][pos.y-1]); }catch(ex){}
        try{ listNeighbors.push(this._grid[pos.x][pos.y+1]); }catch(ex){}
        return listNeighbors;
    }

    // get Tile neiphborhood having the given color
    _getTileNeighborsOfColor(pos, color){
        let listNeighbors = this._getTileNeighbors(pos);    
        return listNeighbors.filter((element) => element != undefined && 
                                    this._grid[element.position.x][element.position.y].color.code === color );
    }    
    // get Tile neiphborhood having only different color
    _getTileNeighborsOfDifferentColor(pos, color){
        let listNeighbors = this._getTileNeighbors(pos);        
        return listNeighbors.filter((element) => element != undefined && 
                                    this._grid[element.position.x][element.position.y].color.code !== color );
    }

    // check if board is all full
    isFull(){
        return this._activeTiles.length == this._dimension*this._dimension;
    }

    // convert this board as html dom
    toHtml(){
        let res = "<table class=\"game-grid\" border=1><tbody>";
        for (let i = 0; i < this.grid.length; i++) {
            res += "<tr>";
            for (let j = 0; j < this.grid[i].length; j++) {
                res += this.grid[i][j].toHtml();
            }
            res += "</tr>";
        }
        res += "</tbody></table>";
        return res;
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

    // ------ methods ----- //
    toHtml(){ return "<td class=\"game-tile\" "+this._color.styleBg()+"></td>"} 
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
    constructor(rank, code){
        this._rank = rank;
        this._code = code;
    }
    // ----- getters ----- //
    get rank(){ return this._rank; }
    get code(){ return this._code; }

    // ----- setters ----- //
    set rank(value) { this._rank = value; }    
    set code(value) { this._code = value; }

    toHtml(){ return "<span style=\"color:"+this.code+"\">"+this.code+"( rank°"+this.rank+" )</span>";}
    styleBg(){ return "style=\"background-color:"+this.code+"\"";}
    styleColor(){ return "style=\"color:"+this.code+"\"";}
}

exports.Board = Board;
exports.Tile = Tile;
exports.Color = Color;
exports.Position = Position;
exports.COLOR_HEX = COLOR_HEX;
