class GridPoint{
    constructor(y, x, val=0){
        this.x = x; //x location of the grid point
        this.y = y; //y location of the grid point
        this.val = val; //Value
        this.f = 0; //total cost function
        this.g = 0; //cost function from start to the current grid point
        this.h = 0; //heuristic estimated cost function from current grid point to the goal
        this.neighbors = []; // neighbors of the current grid point
        this.parent = undefined; // immediate source of the current grid point
    }

    updateNeighbors(grid) {
      let gridCols = grid.cols;
      let gridRows = grid.rows;
      let gridPoints = grid.gridPoints;
      let i = this.y; //Rows
      let j = this.x; //Cols
      
      //Top
      if(i-1 >= 0){
        let nb = gridPoints[i-1][j];
        if(nb.val - this.val <= 1){
          this.neighbors.push(gridPoints[i-1][j]);
        }
      }
      //Bottom
      if(i+1 < gridRows){
        let nb = gridPoints[i+1][j];
        if(nb.val - this.val <= 1){
          this.neighbors.push(gridPoints[i+1][j]);
        }
      }
      //Left
      if(j-1>=0){
        let nb = gridPoints[i][j-1];
        if(nb.val - this.val <= 1){
          this.neighbors.push(gridPoints[i][j-1]);
        }
      }
      //Right
      if(j+1<gridCols){
        let nb = gridPoints[i][j+1];
        if(nb.val - this.val <= 1){
          this.neighbors.push(gridPoints[i][j+1]);
        }
      }


      // if ( < rows - 1) {
      //   this.neighbors.push(gridPoints[i + 1][j]);
      // }
      // if (i > 0) {
      //   this.neighbors.push(gridPoints[i - 1][j]);
      // }
      
      // if (j < cols - 1) {
      //   this.neighbors.push(gridPoints[i][j + 1]);
      // }
      // if (j > 0) {
      //   this.neighbors.push(gridPoints[i][j - 1]);
      // }
    };
}

class Grid{
  constructor(){
    this.gridPoints = [];
    this.cols = 0;
    this.rows = 0;
  }

  init(rows, cols){
    this.cols = cols;
    this.rows = rows;
    for (let i = 0; i < rows; i++) {
      this.gridPoints.push([]);
    }
  
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let gridPoint = new GridPoint(i, j)
        this.gridPoints[i].push(gridPoint);
      }
    }
  }
}


module.exports = {
    GridPoint,
    Grid
}