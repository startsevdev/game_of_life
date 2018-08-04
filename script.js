var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

context.lineWidth = 0.25;
context.strokeStyle = "#2196f3";
context.fillStyle = "#80c6ff";

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
    arr[i] = []
  }
  return arr;
};

function randomGeneration() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < rows; j++) {
      var random_int = getRandomInt(0, 100);
      if (random_int > 25) {
        grid[i][j] = 0;
      } else {
        grid[i][j] = 1;
      }
    }
  }
}

function drawGeneration() {
  drawGrid();
  //context.clearRect(0, 0, canvas.width, canvas.height);
  var numberOfCells = 0;
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j] === 1) {
        drawCell(i, j);
        numberOfCells += 1;
      }
    }
  }
  console.log(numberOfCells + " cells");
}

function updateGeneration() {
  for (var i = 1; i < rows - 1; i++) {
    for (var j = 1; j < rows - 1; j++) {
      var totalCells = 0;
      //console.log(grid[0]);
      totalCells += grid[i-1][j-1];
      totalCells += grid[i][j-1];
      totalCells += grid[i+1][j-1];
      totalCells += grid[i+1][j];
      totalCells += grid[i+1][j+1];
      totalCells += grid[i][j+1];
      totalCells += grid[i-1][j+1];
      totalCells += grid[i-1][j];

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
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = newGrid[i][j]
    }
  }
}

function gameLoop() {
  drawGeneration();
  updateGeneration();
}

var rows = 100;
var grid = createArray(rows);
var newGrid = createArray(rows);
randomGeneration();

setInterval(gameLoop, 50);
