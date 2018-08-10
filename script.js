var rows = 60;
var chance_of_birth = 25;
var fps = 25;


var grid = createArray(rows);
var newGrid = createArray(rows);

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

context.lineWidth = 0.2;
context.strokeStyle = "#ffffff";
context.fillStyle = "#ffffff";


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

function drawGrid() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = 0; i < rows * 2; i++) {
    for (var j = 0; j < rows; j++) {
      context.strokeRect(i * 600 / rows, j * 600 / rows, 600 / rows, 600 / rows);
    }
  }
};

function drawCell(x, y) {
  context.fillRect(x * 600 / rows, y * 600 / rows, 600 / rows, 600 / rows);
};

function createArray(rows) { //creates a 2 dimensional array of required height
  var arr = [];
  for (var i = 0; i < rows * 2; i++) {
    arr[i] = []
  }
  return arr;
};

function drawGeneration() {
  drawGrid();
  //context.clearRect(0, 0, canvas.width, canvas.height);
  //context.strokeRect(0, 0, canvas.width, canvas.height);
  var numberOfCells = 0;
  for (var i = 0; i < rows * 2; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j] === 1) {
        drawCell(i, j);
        numberOfCells += 1;
      }
    }
  }
  document.getElementById("counter").innerHTML=numberOfCells + " cells";
}

function updateGeneration() {
  for (var i = 0; i < rows * 2; i++) {
    for (var j = 0; j < rows; j++) {

      var totalCells = 0;
      var ambient_cells = []

      try {
        ambient_cells.push(grid[i-1][j-1]);
      } catch (err) {}
      try {
        ambient_cells.push(grid[i][j-1]);
      } catch (err) {}
      try {
        ambient_cells.push(grid[i+1][j-1]);
      } catch (err) {}
      try {
        ambient_cells.push(grid[i+1][j]);
      } catch (err) {}
      try {
        ambient_cells.push(grid[i+1][j+1]);
      } catch (err) {}
      try {
        ambient_cells.push(grid[i][j+1]);
      } catch (err) {}
      try {
        ambient_cells.push(grid[i-1][j+1]);
      } catch (err) {}
      try {
        ambient_cells.push(grid[i-1][j]);
      } catch (err) {}

      //console.log(ambient_cells);

      for (var x = 0; x < 8; x++) {
        if (ambient_cells[x] === 1) {
          totalCells += 1;
        }
      };

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
  for (var i = 0; i < rows * 2; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = newGrid[i][j]
    }
  }
}

function randomGeneration() {
  for (var i = 0; i < rows * 2; i++) {
    for (var j = 0; j < rows; j++) {
      var random_int = getRandomInt(0, 100);
      if (random_int < chance_of_birth) {
        grid[i][j] = 1;
      } else {
        grid[i][j] = 0;
      }
    }
  }
}

function gameLoop() {
  drawGeneration();
  updateGeneration();
}

function main() {
  randomGeneration(rows, chance_of_birth);
  setInterval(gameLoop, 1000 / fps);
}

function random_color() {
  var random_int = getRandomInt(0,4);
  switch (random_int) {
    case 0:
      document.body.style.background="#56bc8a";
      break;
    case 1:
      document.body.style.background="#a77dc2";
      break;
    case 2:
      document.body.style.background="#f2992e";
      break;
    case 3:
     document.body.style.background="#36465d";
      break;
    }
}


canvas.onclick = function (event) {
  x = event.layerX;
  y = event.layerY;

  var i = Math.floor(x / canvas.width * rows * 2);
  var j = Math.floor(y / canvas.height * rows);

  grid[i][j] = 1;

  drawGeneration();
}

canvas.onmousedown = function (event) {
  canvas.onmousemove = function (event) {
    x = event.layerX;
    y = event.layerY;

    var i = Math.floor(x / canvas.width * rows * 2);
    var j = Math.floor(y / canvas.height * rows);

    grid[i][j] = 1;

    drawGeneration();
  }
}

canvas.onmouseup = function(event) {
  canvas.onmousemove =null;
}


random_color();
main();
