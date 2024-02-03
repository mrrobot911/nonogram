import render from './helpers/render.js';
import isMatrixEqual from './helpers/equal.js';
import solutions from './helpers/solution.js';

let canvasSize;
let cellSize;
let titleSize = 70;
const gridColors = [];
let cellCount = 5;
let solutionArr = solutions.empty[0].empty;
let gameBegin = false;
const lvl = ['easy', 'medium', 'hard'];
let matrix = 'empty 0';

const canvasContainer = document.createElement('section');
canvasContainer.className = 'canvasContainer';
document.body.appendChild(canvasContainer);

const canvas = document.createElement('canvas');
canvas.id = 'gridCanvas';
canvas.width = canvasSize + titleSize;
canvas.height = canvasSize + titleSize;
const controlsContainer = document.createElement('div');
controlsContainer.className = 'controlsContainer';
const restartBtn = document.createElement('button');
restartBtn.textContent = 'Resturt Game';
const playBtn = document.createElement('button');
playBtn.textContent = 'Start Game';

controlsContainer.append(playBtn, restartBtn);

const templateSelect1 = document.createElement('select');
const templateSelect2 = document.createElement('select');
const templateSelect3 = document.createElement('select');
const selectors = [templateSelect1, templateSelect2, templateSelect3];

lvl.forEach((item, i) => {
  const templateSelect = selectors[i];
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.text = item;
  defaultOption.selected = true;
  defaultOption.disabled = true;
  templateSelect.append(defaultOption);
  const templates = solutions[item];

  templates.forEach((template, index) => {
    const option = document.createElement('option');
    option.value = `${item} ${index} ${Object.keys(template)}`;
    option.text = Object.keys(template);
    templateSelect.append(option);
  });

  templateSelect.addEventListener('change', () => {
    selectors.forEach((el) => {
      const opt = el;
      if (el !== selectors[i]) {
        opt.value = '';
      }
    });
    matrix = selectors[i].value;
    if (item === 'medium') {
      cellCount = 10;
      titleSize = 70;
    } else if (item === 'hard') {
      cellCount = 15;
      titleSize = 90;
    } else {
      cellCount = 5;
      titleSize = 70;
    }
  });
  controlsContainer.append(templateSelect);
});

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
function canvasProperty() {
  canvas.width = canvasSize + titleSize;
  canvas.height = canvasSize + titleSize;
  cellSize = canvasSize / cellCount;
}
canvasProperty();
function resizeCanvas(size) {
  canvasSize = size;
  canvasProperty();
  render(canvas, context, cellSize, gridColors, titleSize, solutionArr);
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
  if (gameBegin) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    const gridX = Math.floor((mouseX - titleSize) / cellSize);
    const gridY = Math.floor((mouseY - titleSize) / cellSize);

    if (gridX >= 0 && gridY >= 0) {
      if (gridColors[gridX][gridY] === 0 || gridColors[gridX][gridY] === 2) {
        gridColors[gridX][gridY] = 1;
      } else if (gridColors[gridX][gridY] === 1) {
        gridColors[gridX][gridY] = 0;
      }
    }
    render(canvas, context, cellSize, gridColors, titleSize, solutionArr);
    const win = isMatrixEqual(gridColors, solutionArr);
    if (win) alert('You win!');
  }
};
const handleContextMenu = (event) => {
  event.preventDefault();
  if (gameBegin) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    const gridX = Math.floor((mouseX - titleSize) / cellSize);
    const gridY = Math.floor((mouseY - titleSize) / cellSize);
    if (gridX >= 0 && gridY >= 0) {
      if (gridColors[gridX][gridY] === 0 || gridColors[gridX][gridY] === 1) {
        gridColors[gridX][gridY] = 2;
      } else if (gridColors[gridX][gridY] === 2) {
        gridColors[gridX][gridY] = 0;
      }
    }
    render(canvas, context, cellSize, gridColors, titleSize, solutionArr);
  }
};
const clearGrid = () => {
  for (let i = 0; i < (canvas.width - titleSize) / cellSize; i += 1) {
    gridColors[i] = [];
    for (let j = 0; j < (canvas.height - titleSize) / cellSize; j += 1) {
      gridColors[i][j] = 0;
    }
  }
};

function StartGame(value) {
  if (value) {
    canvasProperty();
    const valueAddr = value.split(' ');
    const arr = solutions[valueAddr[0]][valueAddr[1]][valueAddr[2]];
    gameBegin = true;
    solutionArr = arr;
    clearGrid();
    render(canvas, context, cellSize, gridColors, titleSize, arr);
  }
}

canvas.addEventListener('click', handleMouseClick);
canvas.addEventListener('contextmenu', handleContextMenu);
window.addEventListener('resize', updateCanvasSize);

playBtn.addEventListener('click', () => {
  StartGame(matrix);
});
restartBtn.addEventListener('click', () => {
  clearGrid();
  render(canvas, context, cellSize, gridColors, titleSize, solutionArr);
});

clearGrid();
render(canvas, context, cellSize, gridColors, titleSize, solutionArr);
