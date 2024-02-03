import render from './helpers/render.js';
import isMatrixEqual from './helpers/equal.js';
import solutions from './helpers/solution.js';

let canvasSize;
const TITLE_SIZE = 70;
const gridColors = [];
const cellCount = 5;
let solutionArr = solutions.empty;

const canvasContainer = document.createElement('section');
canvasContainer.className = 'canvasContainer';
document.body.appendChild(canvasContainer);

const canvas = document.createElement('canvas');
canvas.id = 'gridCanvas';
canvas.width = canvasSize + TITLE_SIZE;
canvas.height = canvasSize + TITLE_SIZE;
const controlsContainer = document.createElement('div');
controlsContainer.className = 'controlsContainer';
const restartBtn = document.createElement('button');
restartBtn.textContent = 'Resturt Game';
const playBtn = document.createElement('button');
playBtn.textContent = 'Start Game';
const templateSelect = document.createElement('select');
const defaultOption = document.createElement('option');
defaultOption.value = solutions.empty;
defaultOption.text = 'Выберите шаблон';
defaultOption.selected = true;
defaultOption.disabled = true;
templateSelect.append(defaultOption);
const templates = solutions.easy;

templates.forEach((_, index) => {
  const option = document.createElement('option');
  option.value = index;
  option.text = index + 1;
  templateSelect.append(option);
});

controlsContainer.append(playBtn, restartBtn, templateSelect);
canvasContainer.append(canvas, controlsContainer);
const context = canvas.getContext('2d');

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
canvas.width = canvasSize + TITLE_SIZE;
canvas.height = canvasSize + TITLE_SIZE;
let cellSize = canvasSize / cellCount;

function resizeCanvas(size) {
  canvasSize = size;
  cellSize = canvasSize / cellCount;
  canvas.width = canvasSize + TITLE_SIZE;
  canvas.height = canvasSize + TITLE_SIZE;
  render(canvas, context, cellSize, gridColors, TITLE_SIZE, solutionArr);
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

const handleMouseClick = (event) => {
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
  render(canvas, context, cellSize, gridColors, TITLE_SIZE, solutionArr);
  const win = isMatrixEqual(gridColors, solutionArr);
  if (win) alert('You win!');
};
const handleContextMenu = (event) => {
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
  render(canvas, context, cellSize, gridColors, TITLE_SIZE, solutionArr);
};
const clearGrid = () => {
  for (let i = 0; i < (canvas.width - TITLE_SIZE) / cellSize; i += 1) {
    gridColors[i] = [];
    for (let j = 0; j < (canvas.height - TITLE_SIZE) / cellSize; j += 1) {
      gridColors[i][j] = 0;
    }
  }
};

function StartGame(arr = solutions.empty) {
  solutionArr = arr;
  clearGrid();
  render(canvas, context, cellSize, gridColors, TITLE_SIZE, arr);
}

canvas.addEventListener('click', handleMouseClick);
canvas.addEventListener('contextmenu', handleContextMenu);
window.addEventListener('resize', updateCanvasSize);

playBtn.addEventListener('click', () => {
  StartGame(solutions.easy[templateSelect.value]);
});
restartBtn.addEventListener('click', () => {
  clearGrid();
  render(canvas, context, cellSize, gridColors, TITLE_SIZE, solutionArr);
});

StartGame(solutions.empty);
