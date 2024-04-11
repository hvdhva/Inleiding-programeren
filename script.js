// https://www.youtube.com/watch?v=kBMnD_aElCQ & https://www.youtube.com/watch?v=jS7iB9mRvcc
var grid = document.getElementById("grid");
var gridSize = 15; //grid size

generateGrid();

function generateGrid() {
  // Generate grid (i=rows j=columns)
  grid.innerHTML="";
  for (var i=0; i<gridSize; i++) {
    var row = grid.insertRow(i);
    for (var j=0; j<gridSize; j++) {
      var cell = row.insertCell(j);
      cell.onclick = function() { clickCell(this); };
      var mine = document.createAttribute("data-mine");       
      mine.value = "false";             
      cell.setAttributeNode(mine);
    }
  }
  addMines();
}

function addMines() {
  // Adds the mines to the grid
  var totalMines = Math.floor(gridSize * gridSize * 0.15); // Adjust mine density as needed
  for (var i=0; i<totalMines; i++) {
    var row = Math.floor(Math.random() * gridSize);
    var col = Math.floor(Math.random() * gridSize);
    var cell = grid.rows[row].cells[col];
    cell.setAttribute("data-mine","true");
  }
}

function revealMines() {
  // Makes all the mines red after game ends
  for (var i=0; i<gridSize; i++) {
    for(var j=0; j<gridSize; j++) {
      var cell = grid.rows[i].cells[j];
      if (cell.getAttribute("data-mine")=="true") cell.className="mine";
    }
  }
}

function checkLevelCompletion() {
  var levelComplete = true;
  for (var i=0; i<gridSize; i++) {
    for(var j=0; j<gridSize; j++) {
      if ((grid.rows[i].cells[j].getAttribute("data-mine")=="false") && (grid.rows[i].cells[j].innerHTML=="")) levelComplete=false;
    }
  }
  if (levelComplete) {
    alert("You Win!");
    revealMines();
  }
}

// Minesweeper game by 101computing.net - www.101computing.et/minesweeper-in-javascript/
function clickCell(cell) {
  // Checks if a mine got clicked
  if (cell.getAttribute("data-mine")=="true") {
    revealMines();
    alert("Game Over");
  } else {
    cell.className="clicked";
    // Counts and displays the number of mines adjacent to tile clicked
    var mineCount=0;
    var cellRow = cell.parentNode.rowIndex;
    var cellCol = cell.cellIndex;
    for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,gridSize-1); i++) {
      for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,gridSize-1); j++) {
        if (grid.rows[i].cells[j].getAttribute("data-mine")=="true") mineCount++;
      }
    }
    cell.innerHTML=mineCount;
    if (mineCount==0) { 
      // Expose every neighboring cell that doesn't contain a mine
      for (var i=Math.max(cellRow-1,0); i<=Math.min(cellRow+1,gridSize-1); i++) {
        for(var j=Math.max(cellCol-1,0); j<=Math.min(cellCol+1,gridSize-1); j++) {
          // Recursive Call
          if (grid.rows[i].cells[j].innerHTML=="") clickCell(grid.rows[i].cells[j]);
        }
      }
    }
    checkLevelCompletion();
  }
}

