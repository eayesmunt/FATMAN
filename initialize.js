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

var initializeKeys = function () {
    keysDown[K_D] = false;
    keysDown[K_LEFT] = false;
    keysDown[K_RIGHT] = false;
    keysDown[K_SPACE] = false;
    keysDown[K_DOWN] = false;
};
