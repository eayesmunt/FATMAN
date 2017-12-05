
/////// MAIN LOOP /////////
var startGame = function () {
    var gameLoop = setInterval(update, 25);
    if (GameOver) {
        clearInterval(gameLoop);
    }
};

var init = function () {
    _.zip.apply(_, map).forEach(row => {
      console.log(row.map(o => o.isBuilding ? "X" : "0").toString())
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

    figurePosition = 500;

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
