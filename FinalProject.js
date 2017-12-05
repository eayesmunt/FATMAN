// Elliot Yesmunt
// Stick Fig

var SCREEN_WIDTH = window.innerWidth - 1;
var SCREEN_HEIGHT = window.innerHeight - 1;
var BLOCK_WIDTH = 750;
var GRAVITY = 1.5;
var GameOver = false;
var Time = new Date();
var DIRECTION_ENUM = ['N', 'E', 'S', 'W'];

var b0 = new Image();
b0.src = './buildings/b0.png';
var b1 = new Image();
b1.src = './buildings/b1.png';
var b2 = new Image();
b2.src = './buildings/b2.png';
var b3 = new Image();
b3.src = './buildings/b3.png';
var b4 = new Image();
b4.src = './buildings/sky.jpg';

var buildingPics = [b0, b1, b2, b3, b4];

// motion of objects around character
var ddx = 0;
var dx = 0;

var theCanvas;
var canvas;

// The figure's position in map. Needs an x y pair.
figureBlock = {
  x: 1,
  y: 1
};

// The figure's position on block. 0 <= x < 750
var figurePosition;

// View point of user/player
var viewDirection;
var figureDirection;

function setDirections () {
  if (map[1][1].directions.some(dir => dir === 'E')) {
    viewDirection = 'N';
    figureDirection = 'E';
  } else {
    viewDirection = 'E';
    figureDirection = 'S';
  }
}

var figure = new figure();
var floor = {
    width: SCREEN_WIDTH,
    height: 20,
    y: SCREEN_HEIGHT - 20,
    x: 0
}

var shelves = [new createShelf(), new createShelf(), new createShelf(), new createShelf(), new createShelf(), new createShelf()];


function drawBackGround() {
    console.log(viewDirection)
    if (figureDirection === 'E' || figureDirection === 'W') {
        if (viewDirection === "N") {
            if(map[figureBlock.x - 1][figureBlock.y].northBId) {
              drawBuilding(map[figureBlock.x - 1][figureBlock.y].northBId, figurePosition - BLOCK_WIDTH);
            }
            drawBuilding(map[figureBlock.x][figureBlock.y].northBId, figurePosition);
            if (map[figureBlock.x + 1][figureBlock.y].northBId) {
              drawBuilding(map[figureBlock.x + 1][figureBlock.y].northBId, figurePosition + BLOCK_WIDTH);
            }
            if (map[figureBlock.x + 2][figureBlock.y].northBId) {
              drawBuilding(map[figureBlock.x + 2][figureBlock.y].northBId, figurePosition + BLOCK_WIDTH * 2);
            }
        }
        else {
            if(map[figureBlock.x + 1][figureBlock.y].southBId){
              drawBuilding(map[figureBlock.x + 1][figureBlock.y].southBId, figurePosition - BLOCK_WIDTH);
            }
            drawBuilding(map[figureBlock.x][figureBlock.y].southBId, figurePosition);
            if (map[figureBlock.x - 1][figureBlock.y].southBId)
            {
              drawBuilding(map[figureBlock.x - 1][figureBlock.y].southBId, figurePosition + BLOCK_WIDTH);
            }
            if (map[figureBlock.x - 2][figureBlock.y].southBId) {
              drawBuilding(map[figureBlock.x - 2][figureBlock.y].southBId, figurePosition + BLOCK_WIDTH * 2);
            }
        }
    } else {
        if (viewDirection === "E") {
            if(map[figureBlock.x][figureBlock.y - 1].eastBId){
              drawBuilding(map[figureBlock.x][figureBlock.y - 1].eastBId, figurePosition - BLOCK_WIDTH);
            }
            drawBuilding(map[figureBlock.x][figureBlock.y].eastBId, figurePosition);
            if (map[figureBlock.x][figureBlock.y + 1].eastBId) {
              drawBuilding(map[figureBlock.x][figureBlock.y + 1].eastBId, figurePosition + BLOCK_WIDTH);
            }
            if (map[figureBlock.x][figureBlock.y + 2].eastBId) {
              drawBuilding(map[figureBlock.x][figureBlock.y + 2].eastBId, figurePosition + BLOCK_WIDTH * 2);
            }
        }
        else {
            if (map[figureBlock.x][figureBlock.y + 1].westBId) {
              drawBuilding(map[figureBlock.x][figureBlock.y + 1].westBId, figurePosition - BLOCK_WIDTH);
            }
            drawBuilding(map[figureBlock.x][figureBlock.y].westBId, figurePosition);
            if (map[figureBlock.x][figureBlock.y - 1].westBId) {
              drawBuilding(map[figureBlock.x][figureBlock.y - 1].westBId, figurePosition + BLOCK_WIDTH);
            }
            if (map[figureBlock.x][figureBlock.y - 2].westBId) {
              drawBuilding(map[figureBlock.x][figureBlock.y - 2].westBId, figurePosition + BLOCK_WIDTH * 2);
            }
        }
    }
};

var drawBuilding = function (bId, x) {
    canvas.drawImage(buildingPics[bId], x, 0, BLOCK_WIDTH, 900);
};

var updateAndDrawShelves = function () {
    shelves.forEach((s) => {
        s.update();
        s.draw(canvas);
    })
};

var checkShelves = function () {
    shelves.forEach((s) => {
        if (s.x + s.width < 0) {
            s.reset();
        }
    });
};

var initializeKeys = function () {
    keysDown[K_D] = false;
    keysDown[K_LEFT] = false;
    keysDown[K_RIGHT] = false;
    keysDown[K_SPACE] = false;
    keysDown[K_DOWN] = false;
};

// FIGURE IS MOVING RIGHT -- FUNCTION USED TO GIVE BACKGROUND APPROPRIATE REFERENCE
var adjustFigurePositionLeft = function () {
    figurePosition += 7
    if (figurePosition > 750) {
        figurePosition = 0;
        if (viewDirection === 'N') {
            figureBlock.x--;
        }
        else if (viewDirection === 'E') {
            figureBlock.y--;
        }
        else if (viewDirection === 'S') {
            figureBlock.x++;
        }
        else if (viewDirection === 'W') {
            figureBlock.y++;
        }
    }
};

// FIGURE IS MOVING LEFT -- FUNCTION USED TO GIVE BACKGROUND APPROPRIATE REFERENCE
var adjustFigurePositionRight = function () {
    figurePosition -= 7;
    if (figurePosition < 0) {
        figurePosition = 750;
        if (viewDirection === 'N') {
            figureBlock.x++;
        }
        else if (viewDirection === 'E') {
            figureBlock.y++;
        }
        else if (viewDirection === 'S') {
            figureBlock.x--;
        }
        else if (viewDirection === 'W') {
            figureBlock.y--;
        }
    }
};

var checkKeys = function () {
    if (keysDown[K_LEFT]) {
        if (figure.state === JUMP) {
            dx = 12;
        } else {
            dx = 7;
        }
        adjustFigurePositionLeft();
    } else if (keysDown[K_RIGHT]) {
        if (figure.state === JUMP) {
            dx = -12;
        } else {
            dx = -7;
        }
        adjustFigurePositionRight();
    } else {
        dx = 0;
        ddx = 0;
    }
    if (keysDown[K_UP]) {
        // var checkMovePos;
        // for (var i = 0; i < 4; i++) {
        //     if (viewDirection) {
        //
        //     }
        // }
        // viewDirection === 'N' ? checkMovePos = 0 : null;
        // viewDirection === 'E' ? checkMovePos = 1 : null;
        // viewDirection === 'S' ? checkMovePos = 2 : null;
        // viewDirection === 'W' ? checkMovePos = 3 : null;
        //
        // if (map[figureBlock.x][figureBlock.y].possibleMoves[checkMovePos]) {
        //     viewDirection =
        // }
    }
};

/////// MAIN LOOP /////////
var startGame = function () {
    var gameLoop = setInterval(update, 25);
    if (GameOver) {
        clearInterval(gameLoop);
    }
};

var updateKeysDown = function (e) {
    keysDown[e.keyCode] = true;
};

var updateKeysUp = function (e) {
    keysDown[e.keyCode] = false;
};

var init = function () {
    _.zip.apply(_, map).forEach(row => {
      console.log(row.map(o => o.isBuilding ? "x" : "0").toString())
    })
    // Setup key listeners
    document.onkeydown = updateKeysDown;
    document.onkeyup = updateKeysUp;

    // Set Size
    theCanvas = document.getElementById('background');
    theCanvas.width = SCREEN_WIDTH;
    theCanvas.height = SCREEN_HEIGHT;

    // Set directions
    setDirections();

    // Draw Figure
    canvas = theCanvas.getContext('2d');
    canvas = figure.drawFigure(canvas);

    // Draw Floor
    canvas.fillStyle = '#020233';
    canvas.fillRect(floor.x, floor.y, floor.width, floor.height);

    figurePosition = 0;

    console.log(figureBlock)
    drawBackGround();

    figure.start();
    startGame();

};

var update = function () {
    figure.checkKeys();
    checkKeys();
    checkPhysics();
    checkShelves();
    canvas.clearRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    canvas.fillStyle = '#020233';
    canvas.fillRect(floor.x, floor.y, floor.width, floor.height);
    drawBackGround();
    updateAndDrawShelves();
    canvas = figure.drawFigure(canvas);
};

var end = function () {

};

var collisionDetect = function (thing) {
    for (var i = 0; i < shelves.length; i++) {
        s = shelves[i];
        collisionWithShelf = true;
        if (
            (thing.x + thing.w < s.x)       // rightSide left of shelf.leftSide
            || (thing.x > s.x + s.width)     // leftSide right of shelf.rightSide
            || (thing.y > s.y + s.height)    // top below shelf.bottom
            || (thing.y + thing.h < s.y)) { // bottom above shelf.top
            collisionWithShelf = false;
        }
        if (collisionWithShelf) {
            if (thing.dy >= 0) {
                collisionItem = s;
                thing.y = s.y - thing.h;
                thing.dy = 0;
                thing.state === JUMP ? thing.state = STAND : null;
                thing.state === POWER_STOMP ? powerStomp() : null;
                break;
            }
        }
    }
    return collisionWithShelf;
}

var checkPhysics = function () {
    var figureCollidedWithShelf;
    var collisionItem;
    var s;

    // Release Jump Energy if JUMP and on ground
    if (figure.state === JUMP) {
        figure.dy += figure.jumpStrength;
        figure.y += figure.dy;
        figure.jumpStrength = 0;
    }

    figureCollidedWithShelf = collisionDetect(figure);

    // CHECK FLOOR COLLISION
    if (figure.y + figure.h >= floor.y) {
        figure.y = floor.y - figure.h;
        figure.dy = 0;
        figure.state === JUMP ? figure.state = STAND : null;
    }
    else if (!figureCollidedWithShelf) {
        figure.dy += GRAVITY;
        figure.y += figure.dy;
    }

};
