import drawGrid from './helpers/drawgrid.js';

const canvasContainer = document.createElement('section');
canvasContainer.className = 'canvasContainer';
document.body.appendChild(canvasContainer);

const canvas = document.createElement('canvas');
canvas.id = 'gridCanvas';
canvas.width = 400;
canvas.height = 400;
canvasContainer.append(canvas);

const context = canvas.getContext('2d');
const cellSize = 20;
const gridColors = [];

for (let i = 0; i < canvas.width / cellSize; i += 1) {
  gridColors[i] = [];
  for (let j = 0; j < canvas.height / cellSize; j += 1) {
    gridColors[i][j] = '#ffffff';
  }
}

function handleMouseClick(event) {
  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;

  const gridX = Math.floor(mouseX / cellSize);
  const gridY = Math.floor(mouseY / cellSize);

  gridColors[gridX][gridY] =
    gridColors[gridX][gridY] === '#ffffff' ? '#ff0000' : '#ffffff';

  drawGrid(canvas, context, cellSize, gridColors);
}

canvas.addEventListener('click', handleMouseClick);

drawGrid(canvas, context, cellSize, gridColors);
