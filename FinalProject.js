// Elliot Yesmunt
// Stick Fig

var SCREEN_WIDTH = window.innerWidth - 1;
var SCREEN_HEIGHT = window.innerHeight - 1;
var GRAVITY = 2;
var GameOver = false;
var Time = new Date();

// motion of objects around character
var ddx = 0;
var dx = 0;

var theCanvas;
var canvas;

var figure = new figure();
var floor = {
    width: SCREEN_WIDTH,
    height: 20,
    y: SCREEN_HEIGHT - 20,
    x: 0
}

var shelves = [new createShelf(), new createShelf(), new createShelf(), new createShelf(), new createShelf(), new createShelf()];

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

var checkKeys = function () {
    if (keysDown[K_LEFT]) {
        dx = 7;
    } else if (keysDown[K_RIGHT]) {
        dx = -7
    } else {
        dx = 0;
        ddx = 0;
    }
};

/////// MAIN LOOP /////////
var startGame = function () {
    var gameLoop = setInterval(update, 50);
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
    // Setup key listeners
    document.onkeydown = updateKeysDown;
    document.onkeyup = updateKeysUp;

    theCanvas = document.getElementById('background');
    theCanvas.width = SCREEN_WIDTH;
    theCanvas.height = SCREEN_HEIGHT;

    canvas = theCanvas.getContext('2d');
    canvas = figure.drawFigure(canvas);

    canvas.fillStyle = '#020233';
    canvas.fillRect(floor.x, floor.y, floor.width, floor.height);

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