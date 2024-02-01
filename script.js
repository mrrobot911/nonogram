import drawGrid from './helpers/drawgrid.js';

const CELL_COUNT = 15;
const CANVAS_SIZE = 600;
const TITLE_SIZE = 70;
const CELL_SIZE = CANVAS_SIZE / CELL_COUNT;
const gridColors = [];

const canvasContainer = document.createElement('section');
canvasContainer.className = 'canvasContainer';
document.body.appendChild(canvasContainer);

const canvas = document.createElement('canvas');
canvas.id = 'gridCanvas';
canvas.width = CANVAS_SIZE + TITLE_SIZE;
canvas.height = CANVAS_SIZE + TITLE_SIZE;
canvasContainer.append(canvas);

const context = canvas.getContext('2d');

for (let i = 0; i < (canvas.width - TITLE_SIZE) / CELL_SIZE; i += 1) {
  gridColors[i] = [];
  for (let j = 0; j < (canvas.height - TITLE_SIZE) / CELL_SIZE; j += 1) {
    gridColors[i][j] = '#ffffff';
  }
}

function handleMouseClick(event) {
  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;

  const gridX = Math.floor((mouseX - TITLE_SIZE) / CELL_SIZE);
  const gridY = Math.floor((mouseY - TITLE_SIZE) / CELL_SIZE);

  if (gridX >= 0 && gridY >= 0) {
    gridColors[gridX][gridY] =
      gridColors[gridX][gridY] === '#ffffff' ? '#000000' : '#ffffff';
  }
  drawGrid(canvas, context, CELL_SIZE, gridColors, TITLE_SIZE);
}
canvas.addEventListener('click', handleMouseClick);

drawGrid(canvas, context, CELL_SIZE, gridColors, TITLE_SIZE);
