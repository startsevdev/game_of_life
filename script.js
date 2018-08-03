var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

context.strokeStyle = "#82b1ff";
context.fillStyle = "#82b1ff";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

function drawGrid() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < rows; j++) {
      context.strokeRect(i * 600 / rows + 20, j * 600 / rows + 20, 600 / rows, 600 / rows);
    }
  }
};

function drawCell(x, y) {
  context.fillRect(x * 600 / rows + 20, y * 600 / rows + 20, 600 / rows, 600 / rows);
};

function createArray(rows) { //creates a 2 dimensional array of required height
  var arr = [];
  for (var i = 0; i < rows; i++) {
    arr[i] = [];
  }
  return arr;
};

function randomGeneration() {
  var total = 0;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < rows; j++) {
      var binary = getRandomInt(0, 2);
      grid[i][j] = binary;
    }
  }
}

function drawGeneration() {
  drawGrid()
  var numberOfCells = 0;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j] === 1) {
        drawCell(i, j);
        numberOfCells += 1;
      }
    }
  }
  //console.log(numberOfCells + " cells");
}

function updateGeneration() {
  for (var i = 1; i < rows - 1; i++) {
    for (var j = 1; j < rows - 1; j++) {
      var totalCells = 0;
      //console.log(grid[0]);
      totalCells += grid[i-1][j+1];
      totalCells += grid[i][j + 1];
      totalCells += grid[i + 1][j + 1];
      totalCells += grid[i + 1][j];
      totalCells += grid[i + 1][j - 1];
      totalCells += grid[i][j - 1];
      totalCells += grid[i-1][j-1];
      totalCells += grid[i - 1][j];

      if (grid[i][j] === 0) {
        switch (totalCells) {
          case 3:
            newGrid[i][j] = 1;
            break;
          default:
            newGrid[i][j] = 0;
        }
      } else if (grid[i][j] === 1) {
        switch (totalCells) {
          case 2:
          case 3:
            newGrid[i][j] = 1;
            break;
          default:
          newGrid[i][j] = 0;
        }
      }
    }
  }
  grid = newGrid;
}

function gameLoop() {
  drawGeneration();
  updateGeneration();
}


var rows = 50;
var grid = createArray(rows);
var newGrid = createArray(rows);;
var x = 0;
var y = 0;

randomGeneration();
setInterval(gameLoop, 250);
//drawGeneration();
//console.log(grid[-1][-1]);
