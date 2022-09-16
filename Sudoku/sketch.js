
var DIM = 9;
var w = 30;
var grid;
var cells = [];
var trueGrid;



// function to make an array of arrays
function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

// I dont like that ive had to make this function..
// Because this doesnt check the effects a choice will have on neighbouring row/columns/sections,
// occasionally an incorrect result is returned (blank spaces/ '') because no value fits that space/no options remain.
// The best solution given time restraints is to re do until a complete result is found (one with no '' spaces).
// Eventually ild like to find a proper solution where an incorrect result is not possible
function redo() {
  for (let i = 0; i < DIM; i++) {
    for (var j = 0; j < DIM; j++) {
      grid[i][j].value = undefined;
      grid[i][j].options = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      grid[i][j].collapsed = false;
    }
  }
}


function setup() {
  createCanvas(270, 270);
  

  // make an array (grid[][]) with an entry for each 'cell'
  // Wow creating the 'section' group for each cell took forever
  grid = make2DArray(9, 9);
  var s = 0;
  var a = 0;
  for (let i = 0; i < DIM; i++) {
    if (i % 3 == 0) {
      a = s;
      s += a;
      s = a
    } else {
      s = a
    }

    for (var j = 0; j < DIM; j++) {
      if ((j % 3) == 0) {
        s++;
      }

      grid[i][j] = new Cell(i, j, w);
      append(cells, grid[i][j])
      grid[i][j].sect = s - 1;
      
    }
  }

  
}




// if mouse if pressed; find what cell the mouse is in then act upon that cell
function mousePressed() {
  for (var i = 0; i < DIM; i++) {
    for (var j = 0; j < DIM; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].reveal();
      }
    }
  }
}

function draw() {
  background(0);
  

  // draw a rectangle (30x30) for each column and row co-ordinate (x = i * 30)
  for (var i = 0; i < DIM; i++) {
    for (var j = 0; j < DIM; j++) {
      grid[i][j].show();

    }
  }

  



  // document row, column and section values
  // make an array (enteredOptions[][]) with an entry for each cells value
  // this should be remade every loop to adjust for the new values available
  // where the the cells value is the same as an entry already in the col/row do not re enter it
  var colValues = make2DArray(9, 0);
  for (let i = 0; i < DIM; i++) {
    for (var j = 0; j < DIM; j++) {
      var cv = grid[i][j].value;
      console.log(grid[i][j].value)
      if (!colValues[i].includes(cv)) {
        append(colValues[i], cv);
      }
    }
    console.log(colValues);
  }

  var rowValues = make2DArray(9, 0);
  for (let i = 0; i < DIM; i++) {
    for (var j = 0; j < DIM; j++) {
      var rv = grid[j][i].value;
      console.log(grid[j][i].value)
      if (!rowValues[i].includes(rv)) {
        append(rowValues[i], rv);
      }
    }
    console.log(rowValues);
  }

  // fuck yeah
  var sectValues = make2DArray(9, 0);
  for (let i = 0; i < DIM; i++) {
    for (var j = 0; j < DIM; j++) {
      var sect = grid[i][j].sect;
      var sv = grid[i][j].value;
      console.log(grid[i][j].value)
      if (!sectValues[sect].includes(sv)) {
        append(sectValues[sect], sv);
      }
    }
    console.log(sectValues);
  }

  // for every un-collapsed cell, check its options against the values in its row, column and section
  // if a value in options already exists in its row column or section remove from options.
  for (let i = 0; i < DIM; i++) {
    for (let j = 0; j < DIM; j++) {
      var c = grid[i][j]
      if (c.collapsed) {
        continue;
      }
      else {
        for (let v = 0; v < c.options.length; v++) {
          for (let s = 0; s < DIM; s++) {
            if (c.options[v] == rowValues[c.row][s]) {
              c.options.splice(v, 1);
            }
            if (c.options[v] == colValues[c.col][s]){
              c.options.splice(v, 1);
            }
            if (c.options[v] == sectValues[c.sect][s]) {
              c.options.splice(v, 1);

            }
          }
        }
      }
    }
  }

  // from WFC. sort given two option (a, b) sort by smallest length
  for (i = 0; i < cells.length; i++) {
    if (cells[i].options.length == 0) {
      cells[i].collapsed = true;
    }
  }
  let cellsCopy = cells.slice();
  cellsCopy = cellsCopy.filter((a) => !a.collapsed);
  for (i = 0; i < cells.length; i++) {
    if (cells[i].collapsed == true && cells[i].value == undefined) {
      redo();

      //// seems to be this code below that triggered 1-3 cells to be collapsed=false and not trigger a re-do
    // } else if (cells[i].collapsed == false) {
    //   break;
    // } else {
    //   trueGrid = grid; //unused and unaccesable for now
    // }
    }
  }
  
  
  // if (cellsCopy[0] == undefined)
  cellsCopy.sort((a, b) => {
    return a.options.length - b.options.length;
  });

  // group the cells with the lowest entropy/options 
  let len = cellsCopy[0].options.length;
  let stopIndex = 0;
  for (let i = 1; i < cellsCopy.length; i++) {
      if (cellsCopy[i].options.length > len) {
          stopIndex = i;
          console.log(stopIndex);
          break;
      }
      console.log(stopIndex);
  }

  // pick from that group randomly, and from the randomly selected cell pick randomly from the remaining options
  if (stopIndex > 0) cellsCopy.splice(stopIndex);
  let cell = random(cellsCopy);
  cell.collapsed = true;
  let pick = random(cell.options);
  console.log(cell.options);
  console.log(pick)
  cell.options = [pick];



 
  // noLoop()
  
}
