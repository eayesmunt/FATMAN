
/////// MAIN LOOP /////////
var startGame = function () {
    var gameLoop = setInterval(update, 25);
    if (GameOver) {
        clearInterval(gameLoop);
    }
};

var init = function () {
    orientedMap.forEach(row => {
        console.log(row.map(o => o.isBuilding ? "X" : "0").toString())
    });

    // Setup key listeners
    document.onkeydown = updateKeysDown;
    document.onkeyup = updateKeysUp;

    // Set Size
    theCanvas = document.getElementById('background');
    theCanvas.width = SCREEN_WIDTH;
    theCanvas.height = SCREEN_HEIGHT;

    viewPortCanvas = document.getElementById('view-port');
    viewPortCanvas.width = 200;
    viewPortCanvas.height = 200;
    vpcontext = viewPortCanvas.getContext('2d')
    vpcontext.fillStyle = 'red';
    vpcontext.fillRect(0, 0, 200, 200);

    // Set directions
    setDirections();

    // Draw Figure
    canvas = theCanvas.getContext('2d');
    canvas = figure.drawFigure(canvas);

    // Draw Floor
    canvas.fillStyle = '#020233';
    canvas.fillRect(floor.x, floor.y, floor.width, floor.height);

    figurePosition = 500;
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
    canvas.fillStyle = '#AAAAAA';
    canvas.fillRect(floor.x, floor.y, floor.width, floor.height);
    canvas.fillStyle = '#3e3e3e';
    canvas.fillRect(floor.x, floor.y + floor.height, floor.width, 200);

    drawBackGround();
    // updateAndDrawShelves();
    canvas = figure.drawFigure(canvas);
    vpcontext.clearRect(0, 0, 200, 200);
    viewPort.draw(vpcontext, map, figureBlock, figureDirection, figurePosition);
};

var end = function () {

};
