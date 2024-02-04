import render from './helpers/render.js';
import isMatrixEqual from './helpers/equal.js';
import solutions from './helpers/solution.js';

let canvasSize;
let cellSize;
let titleSize = 70;
let gridColors = [];
let cellCount = 5;
let solutionArr = solutions.empty[0].empty;
let isGameBegin = false;
let isTimerBegin = false;
let minutes = 0;
let seconds = 0;
let timerInterval;
const lvl = ['easy', 'medium', 'hard'];
let matrix = '';
let clickSoundL = null;
let clickSoundR = null;
let clickSoundApplause = null;

const canvasContainer = document.createElement('section');
canvasContainer.className = 'canvasContainer';
document.body.appendChild(canvasContainer);

const canvas = document.createElement('canvas');
canvas.id = 'gridCanvas';
canvas.width = canvasSize + titleSize;
canvas.height = canvasSize + titleSize;
const controlsContainer = document.createElement('div');
controlsContainer.className = 'controlsContainer';
const timer = document.createElement('p');
timer.className = 'timerEl';
timer.innerText = '00:00';
const restartBtn = document.createElement('button');
restartBtn.textContent = 'Reset Game';
const playBtn = document.createElement('button');
playBtn.textContent = 'Start Game';

controlsContainer.append(timer, playBtn, restartBtn);

const templateSelect1 = document.createElement('select');
const templateSelect2 = document.createElement('select');
const templateSelect3 = document.createElement('select');
const selectContainer = document.createElement('div');
selectContainer.className = 'selectContainer';
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
  selectContainer.append(templateSelect);
});
controlsContainer.append(selectContainer);
const showAnswerBtn = document.createElement('button');
showAnswerBtn.textContent = 'Show Answer';
controlsContainer.append(showAnswerBtn);
const saveGameContainer = document.createElement('div');
saveGameContainer.className = 'saveGameContainer';
const saveGameBtn = document.createElement('button');
saveGameBtn.textContent = 'Save game';
const continueLastGameBtn = document.createElement('button');
continueLastGameBtn.textContent = 'continue last game';
saveGameContainer.append(saveGameBtn, continueLastGameBtn);
controlsContainer.append(saveGameContainer);
canvasContainer.append(canvas, controlsContainer);
const context = canvas.getContext('2d');

if (window.innerWidth < 950) {
  if (window.innerWidth < 750) {
    if (window.innerWidth < 580) {
      canvasSize = 210;
    } else {
      canvasSize = 300;
    }
  } else {
    canvasSize = 420;
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
    resizeCanvas(210);
  }
  if (window.innerWidth <= 750 && window.innerWidth > 580) {
    resizeCanvas(300);
  }
  if (window.innerWidth <= 950 && window.innerWidth > 750) {
    resizeCanvas(420);
  }
  if (window.innerWidth > 950) {
    resizeCanvas(600);
  }
}
function updateTimerDisplay() {
  timer.innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
function startTimer() {
  timerInterval = setInterval(() => {
    seconds += 1;
    if (seconds === 60) {
      seconds = 0;
      minutes += 1;
    }
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  stopTimer();
  seconds = 0;
  minutes = 0;
  updateTimerDisplay();
}

const handleMouseClick = (event) => {
  if (!matrix) {
    const helpParagraf = document.createElement('p');
    helpParagraf.className = 'helpMessage';
    helpParagraf.innerText =
      'First choose the option you want to solve and then press the start button';
    canvasContainer.appendChild(helpParagraf);
    setTimeout(() => canvasContainer.removeChild(helpParagraf), 3000);
  }
  if (isGameBegin) {
    if (!isTimerBegin) {
      startTimer();
      isTimerBegin = true;
    }
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
    if (clickSoundL !== null) {
      clickSoundL.play();
    }
    render(canvas, context, cellSize, gridColors, titleSize, solutionArr);
    const isWinGame = isMatrixEqual(gridColors, solutionArr);
    if (isWinGame) {
      const modalContainer = document.createElement('div');
      modalContainer.className = 'modalContainer';
      const message = document.createElement('p');
      message.innerText = `Great! You have solved the nonogram in ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} seconds!`;
      const closeBtn = document.createElement('button');
      closeBtn.textContent = 'Close';
      closeBtn.addEventListener('click', () => {
        document.body.removeChild(modalContainer);
        resetTimer();
        isTimerBegin = false;
      });
      modalContainer.append(message, closeBtn);
      document.body.appendChild(modalContainer);
      isGameBegin = false;
      stopTimer();
      if (clickSoundApplause !== null) {
        clickSoundApplause.play();
      }
    }
  }
};
const handleContextMenu = (event) => {
  event.preventDefault();
  if (isGameBegin) {
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
    if (clickSoundR !== null) {
      clickSoundR.play();
    }
    render(canvas, context, cellSize, gridColors, titleSize, solutionArr);
  }
};
const clearGrid = () => {
  gridColors = [];
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
    isGameBegin = true;
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
  const isWinGame = isMatrixEqual(gridColors, solutionArr);
  if (!isWinGame) {
    isGameBegin = true;
    clearGrid();
  }
  render(canvas, context, cellSize, gridColors, titleSize, solutionArr);
});
showAnswerBtn.addEventListener('click', () => {
  gridColors = solutionArr;
  render(canvas, context, cellSize, gridColors, titleSize, solutionArr);
  isGameBegin = false;
  stopTimer();
});
saveGameBtn.addEventListener('click', () => {
  localStorage.setItem(
    'saved_game',
    JSON.stringify([cellSize, titleSize, minutes, seconds])
  );
  localStorage.setItem('saved_game_answ', JSON.stringify(gridColors));
  localStorage.setItem('saved_game_quest', JSON.stringify(solutionArr));
});
continueLastGameBtn.addEventListener('click', () => {
  stopTimer();
  solutionArr = JSON.parse(localStorage.getItem('saved_game_quest'));
  gridColors = JSON.parse(localStorage.getItem('saved_game_answ'));
  [cellSize, titleSize, minutes, seconds] = JSON.parse(
    localStorage.getItem('saved_game')
  );
  render(canvas, context, cellSize, gridColors, titleSize, solutionArr);
  startTimer();
});
document.addEventListener('DOMContentLoaded', () => {
  clickSoundL = new Audio('./assets/clickL.mp3');
  clickSoundR = new Audio('./assets/clickR.mp3');
  clickSoundApplause = new Audio('./assets/applause.mp3');
});

clearGrid();
render(canvas, context, cellSize, gridColors, titleSize, solutionArr);
