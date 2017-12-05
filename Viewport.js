
let drawTopDownBuilding = function (context, x, y) {
  context.fillRect(x * 30 + 90, y * 30 + 90, 30, 30);
  context.strokeRect(x * 30 + 90, y * 30 + 90, 30, 30);

};

function Viewport() {
  this.draw = function(context, map, figureBlock, figureDirection, figurePosition){
    context.fillStyle = 'red';
    context.fillRect(0, 0, 200, 200);
    context.fillStyle = 'green';
    let x = 0;
    let y = 0;
    map.forEach((column,i) => {
      column.forEach((block,j) => {
        if (block.isBuilding) {
          drawTopDownBuilding(context, i - figureBlock.x, j - figureBlock.y);
        }
      });
    });
    let image = new Image();

    if (figureDirection === "N"){
      image.src = "./buildings/north.png";
    } else if (figureDirection === "S"){
      image.src = "./buildings/south.png";
    } else if (figureDirection === "E"){
      image.src = "./buildings/east.png";
    } else if (figureDirection === "W"){
      image.src = "./buildings/west.png";
    }

    context.drawImage(image, 95, 90, 24, 24);
  };
};
