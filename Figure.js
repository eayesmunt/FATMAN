// Elliot Yesmunt
/////// FIGURE LOGIC ///////

var SCREEN_WIDTH = window.innerWidth - 10;
var SCREEN_HEIGHT = window.innerHeight - 10;

var STAND = 0;
var WALK = 1;
var PUSH = 2;
var JUMP = 3;
var POWER_STOMP = 4;
var CROUCH = 5;
var QUEUE_JUMP = 6;
var RIGHT = 0;
var LEFT = 1;

var keysDown = [];

var stickWalkingRight0 = new Image();
stickWalkingRight0.src = "./cycles_right/stick-walking-right-0.png";
var stickWalkingRight1 = new Image();
stickWalkingRight1.src = "./cycles_right/stick-walking-right-1.png";
var stickWalkingRight2 = new Image();
stickWalkingRight2.src = "./cycles_right/stick-walking-right-2.png";
var stickWalkingRight3 = new Image();
stickWalkingRight3.src = "./cycles_right/stick-walking-right-3.png";
var stickWalkingRight4 = new Image();
stickWalkingRight4.src = "./cycles_right/stick-walking-right-4.png";

var stickWalkingLeft0 = new Image();
stickWalkingLeft0.src = "./cycles_left/stick-walking-left-0.png";
var stickWalkingLeft1 = new Image();
stickWalkingLeft1.src = "./cycles_left/stick-walking-left-1.png";
var stickWalkingLeft2 = new Image();
stickWalkingLeft2.src = "./cycles_left/stick-walking-left-2.png";
var stickWalkingLeft3 = new Image();
stickWalkingLeft3.src = "./cycles_left/stick-walking-left-3.png";
var stickWalkingLeft4 = new Image();
stickWalkingLeft4.src = "./cycles_left/stick-walking-left-4.png";

var stickCrouchRight = new Image();
stickCrouchRight.src = "./stick-squat-right.png";
var stickCrouchLeft = new Image();
stickCrouchLeft.src = "./stick-squat-left.png";

var stickJumpRight = new Image();
stickJumpRight.src = "./stick-jumping-right.png";
var stickJumpLeft = new Image();
stickJumpLeft.src = "./stick-jumping-left.png";

var stickPushRight = new Image();
stickPushRight.src = './stick-pushing-right.png';
var stickPushLeft = new Image();
stickPushLeft.src = './stick-pushing-left.png';

var walkCyclesRight = [
    stickWalkingRight0,
    stickWalkingRight1,
    stickWalkingRight2,
    stickWalkingRight3,
    stickWalkingRight4
];

var walkCyclesLeft = [
    stickWalkingLeft0,
    stickWalkingLeft1,
    stickWalkingLeft2,
    stickWalkingLeft3,
    stickWalkingLeft4
];


var updateKeysDown = function (e) {
    keysDown[e.keyCode] = true;
};

var updateKeysUp = function (e) {
    keysDown[e.keyCode] = false;
};

/////////////// FIGURE LOGIC ///////////////
var figure = function () {
    tFigure = {
        x: 500,
        y: SCREEN_HEIGHT + 80,
        dy: 0,
        h: 60,
        w: 20,
        state: STAND,
        oriented: RIGHT,
        walkStep: 0,
        jumpStrength: 0,
        // figureLoop: null,

        // CHECK KEYS
        checkKeys: function () {
            if (keysDown[K_D]) {
                if (figure.state === STAND) {
                    figure.state = PUSH;
                }
            } else if (figure.state === PUSH) {
                figure.state = STAND;
            }
            if (keysDown[K_LEFT]) {
                figure.oriented = LEFT;
                if (figure.state !== JUMP && figure.state !== QUEUE_JUMP) {
                    figure.state = WALK;
                }
            }
            else if (keysDown[K_RIGHT]) {
                figure.oriented = RIGHT;
                if (figure.state !== JUMP && figure.state !== QUEUE_JUMP) {
                    figure.state = WALK;
                }
            } else if (figure.state === WALK) {
                figure.state = STAND;
            }

            if (keysDown[K_DOWN] && figure.dy != 0) {
                if (figure.state !== POWER_STOMP) {
                    figure.dy = 5;
                    figure.state = POWER_STOMP;
                }
            }
            else if (keysDown[K_DOWN]) {
                figure.state = CROUCH;
            } else if (figure.state === CROUCH) {
                figure.state = STAND;
            }

            if (keysDown[K_SPACE]) {
                figure.state = QUEUE_JUMP;
            }
            else if (figure.state === QUEUE_JUMP) {
                figure.state = JUMP;
            }
        },

        start: function () {
            figureLoop = setInterval(figure.update, 50);
            GameOver ? clearInterval(figureLoop) : null;
        },

        update: function () {
            // Cycle Walk
            if (figure.state === WALK) {
                figure.walkStep = (figure.walkStep + 1) % 5;
            }
            if (figure.y < 500 && figure.dy > 0 && figure.state !== POWER_STOMP) {
                figure.state = STAND;
            }
        },

        walkCycle: function () {
            if (figure.oriented === RIGHT) {
                canvas.drawImage(walkCyclesRight[figure.walkStep], figure.x, figure.y, 25, 60);
            } else if (figure.oriented === LEFT) {
                canvas.drawImage(walkCyclesLeft[figure.walkStep], figure.x, figure.y, 25, 60);
            }
        },

        drawFigure: function (canvas) {
            switch (figure.state) {
                case STAND:
                    figure.oriented === RIGHT
                        ? canvas.drawImage(stickWalkingRight0, figure.x, figure.y, 25, 60)
                        : canvas.drawImage(stickWalkingLeft0, figure.x, figure.y, 25, 60);
                    break;
                case WALK:
                    figure.walkCycle();
                    break;
                case PUSH:
                    figure.oriented === RIGHT
                        ? canvas.drawImage(stickPushRight, figure.x, figure.y + 20, 50, 40)
                        : canvas.drawImage(stickPushLeft, figure.x - 20, figure.y + 20, 50, 40);
                    break;
                case JUMP:
                    figure.oriented === RIGHT
                        ? canvas.drawImage(stickJumpRight, figure.x, figure.y, 20, 60)
                        : canvas.drawImage(stickJumpLeft, figure.x, figure.y, 20, 60);
                    break;
                case CROUCH:
                    figure.oriented === RIGHT
                        ? canvas.drawImage(stickCrouchRight, figure.x, figure.y + 28, 43, 30)
                        : canvas.drawImage(stickCrouchLeft, figure.x - 20, figure.y + 28, 43, 30);
                    break;
                case QUEUE_JUMP:
                    figure.jumpStrength === 0 ? figure.jumpStrength = -15 : null;
                    figure.jumpStrength > -35 ? figure.jumpStrength -= 1 : null;
                    figure.oriented === RIGHT
                        ? canvas.drawImage(stickCrouchRight, figure.x, figure.y + 28, 43, 30)
                        : canvas.drawImage(stickCrouchLeft, figure.x - 20, figure.y + 28, 43, 30);
                    break;
                case POWER_STOMP:
                    figure.oriented === RIGHT
                        ? canvas.drawImage(stickCrouchRight, figure.x, figure.y + 28, 43, 30)
                        : canvas.drawImage(stickCrouchLeft, figure.x - 20, figure.y + 28, 43, 30);
                    break;
            }
            return canvas;
        }
    }
    return tFigure;
};

K_A = 65;
K_S = 83;
K_D = 68;
K_LEFT = 37;
K_RIGHT = 39;
K_SPACE = 32;
K_DOWN = 40;