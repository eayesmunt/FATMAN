
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
    canvas.drawImage(buildingPics[bId], x - BUILDING_OFFSET, 200, BLOCK_WIDTH, 600);
};

var drawRightEnd = function (x) {
    canvas.drawImage(rightEndBuilding, x - BUILDING_OFFSET, 0, BLOCK_WIDTH, 1345);
};

var drawLeftEnd = function (x) {
    canvas.drawImage(leftEndBuilding, x - BUILDING_OFFSET, 0, BLOCK_WIDTH, 1345);
};

function drawBackGround() {
    let figureOffset = -figurePosition + 1000;
    if (figureDirection === 'E' || figureDirection === 'W') {
        if (viewDirection === "N") {
            if (map[figureBlock.x - 1][figureBlock.y].northBId !== undefined) {
                drawBuilding(map[figureBlock.x - 1][figureBlock.y].northBId, figureOffset - BLOCK_WIDTH);
            } else {
                drawLeftEnd(figureOffset - BLOCK_WIDTH);
            }
            drawBuilding(map[figureBlock.x][figureBlock.y].northBId, figureOffset);
            if (map[figureBlock.x + 1][figureBlock.y].northBId !== undefined) {
                drawBuilding(map[figureBlock.x + 1][figureBlock.y].northBId, figureOffset + BLOCK_WIDTH);
            } else {
                drawRightEnd(figureOffset + BLOCK_WIDTH);
            }
            if (map[figureBlock.x + 2][figureBlock.y].northBId !== undefined) {
                drawBuilding(map[figureBlock.x + 2][figureBlock.y].northBId, figureOffset + BLOCK_WIDTH * 2);
            } else {
                drawRightEnd(figureOffset + BLOCK_WIDTH * 2);
            }
        }
        else {
            if (map[figureBlock.x + 1][figureBlock.y].southBId !== undefined) {
                drawBuilding(map[figureBlock.x + 1][figureBlock.y].southBId, figureOffset - BLOCK_WIDTH);
            } else {
                drawLeftEnd(figureOffset - BLOCK_WIDTH);
            }
            drawBuilding(map[figureBlock.x][figureBlock.y].southBId, figureOffset);
            if (map[figureBlock.x - 1] && map[figureBlock.x - 1][figureBlock.y].southBId !== undefined) {
                drawBuilding(map[figureBlock.x - 1][figureBlock.y].southBId, figureOffset + BLOCK_WIDTH);
            } else {
                drawRightEnd(figureOffset + BLOCK_WIDTH);
            }
            if (map[figureBlock.x - 2] && map[figureBlock.x - 2][figureBlock.y].southBId !== undefined) {
                drawBuilding(map[figureBlock.x - 2][figureBlock.y].southBId, figureOffset + BLOCK_WIDTH * 2);
            } else {
                drawRightEnd(figureOffset + BLOCK_WIDTH * 2);
            }
        }
    } else {
        if (viewDirection === "E") {
            if (map[figureBlock.x][figureBlock.y - 1] && map[figureBlock.x][figureBlock.y - 1].eastBId !== undefined) {
                drawBuilding(map[figureBlock.x][figureBlock.y - 1].eastBId, figureOffset - BLOCK_WIDTH);
            } else {
                drawLeftEnd(figureOffset - BLOCK_WIDTH);
            }
            drawBuilding(map[figureBlock.x][figureBlock.y].eastBId, figureOffset);
            if (map[figureBlock.x][figureBlock.y + 1] && map[figureBlock.x][figureBlock.y + 1].eastBId !== undefined) {
                drawBuilding(map[figureBlock.x][figureBlock.y + 1].eastBId, figureOffset + BLOCK_WIDTH);
            } else {
                drawRightEnd(figureOffset + BLOCK_WIDTH);
            }
            if (map[figureBlock.x][figureBlock.y + 2] && map[figureBlock.x][figureBlock.y + 2].eastBId !== undefined) {
                drawBuilding(map[figureBlock.x][figureBlock.y + 2].eastBId, figureOffset + BLOCK_WIDTH * 2);
            }
            else {
                drawRightEnd(figureOffset + BLOCK_WIDTH * 2);
            }
        }
        else {
            if (map[figureBlock.x][figureBlock.y + 1] && map[figureBlock.x][figureBlock.y + 1].westBId !== undefined) {
                drawBuilding(map[figureBlock.x][figureBlock.y + 1].westBId, figureOffset - BLOCK_WIDTH);
            }
            drawBuilding(map[figureBlock.x][figureBlock.y].westBId, figureOffset);
            if (map[figureBlock.x][figureBlock.y - 1] && map[figureBlock.x][figureBlock.y - 1].westBId !== undefined) {
                drawBuilding(map[figureBlock.x][figureBlock.y - 1].westBId, figureOffset + BLOCK_WIDTH);
            } else {
                drawRightEnd(figureOffset + BLOCK_WIDTH);
            }
            if (map[figureBlock.x][figureBlock.y - 2] && map[figureBlock.x][figureBlock.y - 2].westBId !== undefined) {
                drawBuilding(map[figureBlock.x][figureBlock.y - 2].westBId, figureOffset + BLOCK_WIDTH * 2);
            }
            else {
                drawRightEnd(figureOffset + BLOCK_WIDTH * 2);
            }
        }
    }
};


var adjustdxddxLeft = function () {
    if (figure.state === JUMP) {
        dx = 12;
    } else {
        dx = 7;
    }
}

var adjustdxddxRight = function () {
    if (figure.state === JUMP) {
        dx = -12;
    } else {
        dx = -7;
    }
}

var checkKeys = function () {
    let canGoRight = map[figureBlock.x][figureBlock.y].directions.some(dir => dir === figureDirection);
    let leftDir = Directions.find(object => object.direction === figureDirection).opposite;
    let canGoLeft = map[figureBlock.x][figureBlock.y].directions.some(dir => dir === leftDir);

    if (keysDown[K_LEFT] && canGoLeft) {
        adjustdxddxLeft();
        adjustFigurePositionLeft();
    } else if (keysDown[K_RIGHT] && canGoRight) {
        adjustdxddxRight();
        adjustFigurePositionRight();
    } else {
        dx = 0;
        ddx = 0;
    }
    if (keysDown[K_UP]) {
        figure.turningLeft = true;
    } else if (figure.turningLeft) {
        if (map[figureBlock.x][figureBlock.y].directions.some(dir => dir === viewDirection)) {
            let oldViewDirection = viewDirection;
            viewDirection = Directions.find(object => object.direction === figureDirection).opposite;
            figureDirection = oldViewDirection;
        }
        figure.turningLeft = false;
    }
    if (keysDown[K_DOWN]) {
        figure.turningRight = true;
    } else if (figure.turningRight) {
        let oppositeViewDirection = Directions.find(object => object.direction === viewDirection).opposite;

        if (map[figureBlock.x][figureBlock.y].directions.some(dir => dir === oppositeViewDirection)) {
            let oldFigureDirection = figureDirection;
            figureDirection = oppositeViewDirection;
            viewDirection = oldFigureDirection;
            console.log("X: " + figureBlock.x,
                "Y: " + figureBlock.y,
                "Fig Direction: " + figureDirection);
        }
        figure.turningRight = false;
    }
};

// FIGURE IS MOVING RIGHT -- FUNCTION USED TO GIVE BACKGROUND APPROPRIATE REFERENCE
var adjustFigurePositionLeft = function () {
    figurePosition -= 7
    if (figurePosition < 0) {
        figurePosition = 750;
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
        console.log("X: " + figureBlock.x,
            "Y: " + figureBlock.y,
            "Fig Direction: " + figureDirection);
    }
};

// FIGURE IS MOVING LEFT -- FUNCTION USED TO GIVE BACKGROUND APPROPRIATE REFERENCE
var adjustFigurePositionRight = function () {
    figurePosition += 7;
    if (figurePosition > 750) {
        figurePosition = 0;
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
        console.log("X: " + figureBlock.x,
            "Y: " + figureBlock.y,
            "Fig Direction: " + figureDirection);
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
