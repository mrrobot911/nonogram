import drawGrid from './helpers/drawgrid.js';
import isMatrixEqual from './helpers/equal.js';
import arr from './helpers/solution.js';

const CELL_COUNT = 5;
let CANVAS_SIZE = window.innerWidth < 700 ? 400 : 600;
let CELL_SIZE = CANVAS_SIZE / CELL_COUNT;
const TITLE_SIZE = 70;
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
function resizeCanvas(size) {
  CANVAS_SIZE = size;
  CELL_SIZE = CANVAS_SIZE / CELL_COUNT;
  canvas.width = CANVAS_SIZE + TITLE_SIZE;
  canvas.height = CANVAS_SIZE + TITLE_SIZE;
  drawGrid(canvas, context, CELL_SIZE, gridColors, TITLE_SIZE, arr);
}
function updateCanvasSize() {
  if (window.innerWidth <= 400) {
    resizeCanvas(200);
  }
  if (window.innerWidth <= 500 && window.innerWidth > 400) {
    resizeCanvas(300);
  }
  if (window.innerWidth <= 700 && window.innerWidth > 500) {
    resizeCanvas(400);
  }
  if (window.innerWidth > 700) {
    resizeCanvas(600);
  }
}

for (let i = 0; i < (canvas.width - TITLE_SIZE) / CELL_SIZE; i += 1) {
  gridColors[i] = [];
  for (let j = 0; j < (canvas.height - TITLE_SIZE) / CELL_SIZE; j += 1) {
    gridColors[i][j] = 0;
  }
}

function handleMouseClick(event) {
  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;

  const gridX = Math.floor((mouseX - TITLE_SIZE) / CELL_SIZE);
  const gridY = Math.floor((mouseY - TITLE_SIZE) / CELL_SIZE);

  if (gridX >= 0 && gridY >= 0) {
    gridColors[gridX][gridY] = gridColors[gridX][gridY] === 0 ? 1 : 0;
  }
  drawGrid(canvas, context, CELL_SIZE, gridColors, TITLE_SIZE, arr);
  const win = isMatrixEqual(gridColors, arr);
  if (win) alert('You win!');
}
canvas.addEventListener('click', handleMouseClick);
window.addEventListener('resize', updateCanvasSize);

drawGrid(canvas, context, CELL_SIZE, gridColors, TITLE_SIZE, arr);
