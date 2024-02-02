import drawGrid from './helpers/drawgrid.js';
import isMatrixEqual from './helpers/equal.js';
import arr from './helpers/solution.js';

const CELL_COUNT = 5;
let canvasSize;

if (window.innerWidth < 950) {
  if (window.innerWidth < 750) {
    if (window.innerWidth < 580) {
      canvasSize = 200;
    } else {
      canvasSize = 300;
    }
  } else {
    canvasSize = 400;
  }
} else {
  canvasSize = 600;
}
let cellSize = canvasSize / CELL_COUNT;
const TITLE_SIZE = 70;
const gridColors = [];

const canvasContainer = document.createElement('section');
canvasContainer.className = 'canvasContainer';
document.body.appendChild(canvasContainer);

const canvas = document.createElement('canvas');
canvas.id = 'gridCanvas';
canvas.width = canvasSize + TITLE_SIZE;
canvas.height = canvasSize + TITLE_SIZE;
canvasContainer.append(canvas);

const context = canvas.getContext('2d');
function resizeCanvas(size) {
  canvasSize = size;
  cellSize = canvasSize / CELL_COUNT;
  canvas.width = canvasSize + TITLE_SIZE;
  canvas.height = canvasSize + TITLE_SIZE;
  drawGrid(canvas, context, cellSize, gridColors, TITLE_SIZE, arr);
}
function updateCanvasSize() {
  if (window.innerWidth <= 580) {
    resizeCanvas(200);
  }
  if (window.innerWidth <= 750 && window.innerWidth > 580) {
    resizeCanvas(300);
  }
  if (window.innerWidth <= 950 && window.innerWidth > 750) {
    resizeCanvas(400);
  }
  if (window.innerWidth > 950) {
    resizeCanvas(600);
  }
}

for (let i = 0; i < (canvas.width - TITLE_SIZE) / cellSize; i += 1) {
  gridColors[i] = [];
  for (let j = 0; j < (canvas.height - TITLE_SIZE) / cellSize; j += 1) {
    gridColors[i][j] = 0;
  }
}

function handleMouseClick(event) {
  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;

  const gridX = Math.floor((mouseX - TITLE_SIZE) / cellSize);
  const gridY = Math.floor((mouseY - TITLE_SIZE) / cellSize);

  if (gridX >= 0 && gridY >= 0) {
    if (gridColors[gridX][gridY] === 0 || gridColors[gridX][gridY] === 2) {
      gridColors[gridX][gridY] = 1;
    } else if (gridColors[gridX][gridY] === 1) {
      gridColors[gridX][gridY] = 0;
    }
  }
  drawGrid(canvas, context, cellSize, gridColors, TITLE_SIZE, arr);
  const win = isMatrixEqual(gridColors, arr);
  if (win) alert('You win!');
}
canvas.addEventListener('click', handleMouseClick);
canvas.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  const mouseX = event.clientX - canvas.getBoundingClientRect().left;
  const mouseY = event.clientY - canvas.getBoundingClientRect().top;

  const gridX = Math.floor((mouseX - TITLE_SIZE) / cellSize);
  const gridY = Math.floor((mouseY - TITLE_SIZE) / cellSize);
  if (gridX >= 0 && gridY >= 0) {
    if (gridColors[gridX][gridY] === 0 || gridColors[gridX][gridY] === 1) {
      gridColors[gridX][gridY] = 2;
    } else if (gridColors[gridX][gridY] === 2) {
      gridColors[gridX][gridY] = 0;
    }
  }
  drawGrid(canvas, context, cellSize, gridColors, TITLE_SIZE, arr);
  console.log(gridColors);
});
window.addEventListener('resize', updateCanvasSize);

drawGrid(canvas, context, cellSize, gridColors, TITLE_SIZE, arr);
