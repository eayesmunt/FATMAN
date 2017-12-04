// let _ = require("underscore");

let Directions = [
  {
    DX: 0,
    DY: -1,
    direction: "N",
    opposite: "S"
  },
  {
    DX: 0,
    DY: 1,
    direction: "S",
    opposite: "N"
  },
  {
    DX: 1,
    DY: 0,
    direction: "E",
    opposite: "W"
  },
  {
    DX: -1,
    DY: 0,
    direction: "W",
    opposite: "E"
  }
]

function Node() {
  this.directions = []
  this.isBuilding = true
  this.northBId;
  this.southBId;
  this.eastBId;
  this.westBId;
}

WIDTH = 21; HEIGHT = 21;

let map = new Array(HEIGHT);

for (i=0; i< HEIGHT; i++){
  map[i] = createRow();
}

function createRow() {
  let row = new Array(WIDTH);
  for (var i = 0; i < WIDTH; i++) {
    row[i] = new Node()
  }
  return row;
}


function carvePath(curX, curY) {
  let directions = _.shuffle(Directions);

  directions.forEach(direction => {

    let newX = curX + direction.DX*2;
    let newY = curY + direction.DY*2;

    if (map[newX] && map[newX][newY] && map[newX][newY].directions.length == 0){
      map[curX][curY].directions.push(direction.direction);
      map[curX+direction.DX][curY+direction.DY].isBuilding = false;
      map[curX+direction.DX][curY+direction.DY].directions.push(direction.direction);
      map[curX+direction.DX][curY+direction.DY].directions.push(direction.opposite);
      map[newX][newY].directions.push(direction.opposite);
      map[newX][newY].isBuilding = false;
      map[curX+direction.DX][curY+direction.DY].northBId = Math.round(Math.random()*3);
      map[curX+direction.DX][curY+direction.DY].southBId = Math.round(Math.random()*3);
      map[curX+direction.DX][curY+direction.DY].eastBId = Math.round(Math.random()*3);
      map[curX+direction.DX][curY+direction.DY].westBId = Math.round(Math.random()*3);

      map[curX][curY].northBId = direction.direction == "N" ? 4 : Math.round(Math.random()*3);
      map[curX][curY].southBId = direction.direction == "S" ? 4 : Math.round(Math.random()*3);
      map[curX][curY].eastBId = direction.direction == "E" ? 4 : Math.round(Math.random()*3);
      map[curX][curY].westBId = direction.direction == "W" ? 4 : Math.round(Math.random()*3);
      carvePath(newX, newY);
    }
  })
}
map[1][1].isBuilding = false;
carvePath(1,1)
