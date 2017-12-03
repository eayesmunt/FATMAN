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

var stickRunningRight0 = new Image();
var stickRunningRight1 = new Image();
var stickRunningRight2 = new Image();
var stickRunningRight3 = new Image();
var stickRunningRight4 = new Image();
var stickRunningRight5 = new Image();
var stickRunningRight6 = new Image();
var stickRunningRight7 = new Image();
stickRunningRight0.src = "./cycles_right/stick_running_right_0.png";
stickRunningRight1.src = "./cycles_right/stick_running_right_1.png";
stickRunningRight2.src = "./cycles_right/stick_running_right_2.png";
stickRunningRight3.src = "./cycles_right/stick_running_right_3.png";
stickRunningRight4.src = "./cycles_right/stick_running_right_4.png";
stickRunningRight6.src = "./cycles_right/stick_running_right_6.png";
stickRunningRight5.src = "./cycles_right/stick_running_right_5.png";
stickRunningRight7.src = "./cycles_right/stick_running_right_7.png";

var stickRunningLeft0 = new Image();
var stickRunningLeft1 = new Image();
var stickRunningLeft2 = new Image();
var stickRunningLeft3 = new Image();
var stickRunningLeft4 = new Image();
var stickRunningLeft5 = new Image();
var stickRunningLeft6 = new Image();
var stickRunningLeft7 = new Image();
stickRunningLeft0.src = "./cycles_left/stick_running_left_0.png";
stickRunningLeft1.src = "./cycles_left/stick_running_left_1.png";
stickRunningLeft2.src = "./cycles_left/stick_running_left_2.png";
stickRunningLeft3.src = "./cycles_left/stick_running_left_3.png";
stickRunningLeft4.src = "./cycles_left/stick_running_left_4.png";
stickRunningLeft5.src = "./cycles_left/stick_running_left_5.png";
stickRunningLeft6.src = "./cycles_left/stick_running_left_6.png";
stickRunningLeft7.src = "./cycles_left/stick_running_left_7.png";

var stickCrouchRight = new Image();
stickCrouchRight.src = "./stick-squat-right.png";
var stickCrouchLeft = new Image();
stickCrouchLeft.src = "./stick-squat-left.png";

var stickJumpRight = new Image();
stickJumpRight.src = "./stick-jumping-right.png";
var stickJumpLeft = new Image();
stickJumpLeft.src = "./stick-jumping-left.png";

var stickStandRight = new Image();
stickStandRight.src = "./stick-stand-right.png";
var stickStandLeft = new Image();
stickStandLeft.src = "./stick-stand-left.png";

var stickPushRight = new Image();
stickPushRight.src = './stick-pushing-right.png';
var stickPushLeft = new Image();
stickPushLeft.src = './stick-pushing-left.png';


// WILL CHANGE IMAGES TO APPEAR LIKE RUNNING
var walkCyclesRight = [
    function () {
        canvas.drawImage(stickRunningRight0, figure.x - 10, figure.y, 40, 60);
    },
    function () {
        canvas.drawImage(stickRunningRight1, figure.x - 6, figure.y, 33, 60);
    },
    function () {
        canvas.drawImage(stickRunningRight2, figure.x - 4, figure.y, 30, 60);
    },
    function () {
        canvas.drawImage(stickRunningRight3, figure.x - 2, figure.y, 28, 60);
    },
    function () {
        canvas.drawImage(stickRunningRight4, figure.x, figure.y, 27, 60);
    },
    function () {
        canvas.drawImage(stickRunningRight5, figure.x - 2, figure.y, 32, 60);
    },
    function () {
        canvas.drawImage(stickRunningRight6, figure.x - 4, figure.y, 38, 60);
    },
    function () {
        canvas.drawImage(stickRunningRight7, figure.x - 6, figure.y, 40, 60);
    },
];

var walkCyclesLeft = [
    function () {
        canvas.drawImage(stickRunningLeft0, figure.x - 10, figure.y, 40, 60);
    },
    function () {
        canvas.drawImage(stickRunningLeft1, figure.x - 6, figure.y, 33, 60);
    },
    function () {
        canvas.drawImage(stickRunningLeft2, figure.x - 4, figure.y, 30, 60);
    },
    function () {
        canvas.drawImage(stickRunningLeft3, figure.x - 2, figure.y, 28, 60);
    },
    function () {
        canvas.drawImage(stickRunningLeft4, figure.x, figure.y, 27, 60);
    },
    function () {
        canvas.drawImage(stickRunningLeft5, figure.x - 2, figure.y, 32, 60);
    },
    function () {
        canvas.drawImage(stickRunningLeft6, figure.x - 4, figure.y, 38, 60);
    },
    function () {
        canvas.drawImage(stickRunningLeft7, figure.x - 6, figure.y, 40, 60);
    },
];

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
            figureLoop = setInterval(figure.update, 45);
            GameOver ? clearInterval(figureLoop) : null;
        },

        update: function () {
            // Cycle Walk
            if (figure.state === WALK) {
                figure.walkStep = (figure.walkStep + 1) % 8;
            }
            if (figure.y < 500 && figure.dy > 0 && figure.state !== POWER_STOMP) {
                figure.state = STAND;
            }
        },

        walkCycle: function () {
            if (figure.oriented === RIGHT) {
                walkCyclesRight[figure.walkStep]();
            } else if (figure.oriented === LEFT) {
                walkCyclesLeft[figure.walkStep]();
            }
        },

        drawFigure: function (canvas) {
            switch (figure.state) {
                case STAND:
                    figure.oriented === RIGHT
                        ? canvas.drawImage(stickStandRight, figure.x, figure.y, 16, 60)
                        : canvas.drawImage(stickStandLeft, figure.x, figure.y, 16, 60);
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