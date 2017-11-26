// Elliot Yesmunt

var createShelf = function () {
    var tShelf = {};
    tShelf.height = 10 + Math.random() * 30;
    tShelf.width = 300 + Math.random() * 200;
    tShelf.x = 10 + Math.random() * SCREEN_WIDTH * 1.5;
    tShelf.y = 100 + Math.random() * 500;

    tShelf.reset = function () {
        tShelf.height = 10 + Math.random() * 30;
        tShelf.width = 250 + Math.random() * 200;
        tShelf.x = SCREEN_WIDTH + Math.random() * 400;
        tShelf.y = 200 + Math.random() * 400;
    };

    tShelf.update = function () {
        this.x += dx;
    }

    tShelf.draw = function (canvas) {
        canvas.fillStyle = '#020233';
        canvas.fillRect(this.x, this.y, this.width, this.height);
    }

    return tShelf;
};