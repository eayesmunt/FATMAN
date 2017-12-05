
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

var drawBuilding = function (bId, x) {
    canvas.drawImage(buildingPics[bId], x, 0, BLOCK_WIDTH, 900);
};

function drawBackGround() {
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

var updateKeysDown = function (e) {
    keysDown[e.keyCode] = true;
};

var updateKeysUp = function (e) {
    keysDown[e.keyCode] = false;
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
