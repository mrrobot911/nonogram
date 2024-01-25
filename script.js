const canvas = document.createElement('canvas');
canvas.id = 'gridCanvas';
canvas.width = 400;
canvas.height = 400;
const canvasContainer = document.createElement('section');
canvasContainer.className = 'canvasContainer';
canvasContainer.append(canvas);

document.body.appendChild(canvasContainer);
const context = canvas.getContext('2d');
const cellSize = 20;

function drawGrid() {
  context.beginPath();

  for (let x = 0; x <= canvas.width; x += cellSize) {
    context.moveTo(x, 0);
    context.lineTo(x, canvas.height);
  }

  for (let y = 0; y <= canvas.height; y += cellSize) {
    context.moveTo(0, y);
    context.lineTo(canvas.width, y);
  }

  context.strokeStyle = '#ccc';
  context.lineWidth = 1;

  context.stroke();
}

drawGrid();
