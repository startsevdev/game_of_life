var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

context.strokeStyle = "#82b1ff";
context.fillStyle = "#82b1ff";

//setInterval(drawRandomGeneration, 1000);

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

function drawRandomGeneration() {
  drawGrid();
  //context.clearRect(0, 0, canvas.width, canvas.height);
  var numberOfCells = getRandomInt(rows * rows * 0.25 , rows * rows * 0.75);
  for (var i = 0; i < numberOfCells; i++){
    var x = getRandomInt(0, rows);
    var y = getRandomInt(0, rows);
    drawCell(x, y);
  }
  console.log(numberOfCells + " cells")
};

function createArray(rows) { //creates a 2 dimensional array of required height
  var arr = [];
  for (var i = 0; i < rows; i++) {
    arr[i] = [];
  }
  return arr;
};

function randomGeneration() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < rows; j++) {
      var binary = getRandomInt(0, 2);
      grid[i][j] = binary;
    }
  }
}

function drawGeneration() {
  var numberOfCells = 0;

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j] === 1) {
        drawCell(i, j);
        numberOfCells += 1;
      }
    }
  }
  console.log(numberOfCells);
}


var rows = 50;
var grid = createArray(rows);

randomGeneration();
drawGrid();
drawGeneration();
