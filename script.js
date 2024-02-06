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
let matrix = 'easy 0 arrow';
let clickSoundL = null;
let clickSoundR = null;
let clickSoundApplause = null;
let theme = 'light';
let isSound = true;
const resultsTemp = localStorage.getItem('results') || [];
let results = resultsTemp.length > 0 ? JSON.parse(resultsTemp) : resultsTemp;

function lvlCheck(item) {
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
}

document.documentElement.dataset.theme = theme;
const canvasContainer = document.createElement('section');
canvasContainer.className = 'canvasContainer';
document.body.appendChild(canvasContainer);

const canvas = document.createElement('canvas');
canvas.id = 'gridCanvas';
canvas.width = canvasSize + titleSize;
canvas.height = canvasSize + titleSize;
const context = canvas.getContext('2d');
const controlsContainer = document.createElement('div');
controlsContainer.className = 'controlsContainer';
const timer = document.createElement('p');
timer.className = 'timerEl';
timer.innerText = '00:00';
const startBtnContainer = document.createElement('div');
startBtnContainer.className = 'btnContainer';
const restartBtn = document.createElement('button');
restartBtn.textContent = 'Reset Game';
restartBtn.className = 'buttonEl';
const playBtn = document.createElement('button');
playBtn.textContent = 'Start Game';
playBtn.className = 'buttonEl';
playBtn.disabled = true;
startBtnContainer.append(playBtn, restartBtn);

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
      playBtn.disabled = false;
    });
    matrix = selectors[i].value;
    lvlCheck(item);
    playBtn.disabled = false;
  });
  selectContainer.append(templateSelect);
});
const showContainer = document.createElement('div');
showContainer.className = 'btnContainer';
const showAnswerBtn = document.createElement('button');
showAnswerBtn.textContent = 'Solution';
showAnswerBtn.className = 'buttonEl';
showAnswerBtn.disabled = true;
const showResultsBtn = document.createElement('button');
showResultsBtn.textContent = 'Show results';
showResultsBtn.className = 'buttonEl';
showContainer.append(showAnswerBtn, showResultsBtn);
const saveGameContainer = document.createElement('div');
saveGameContainer.className = 'btnContainer';
const saveGameBtn = document.createElement('button');
saveGameBtn.textContent = 'Save game';
saveGameBtn.className = 'buttonEl';
const continueLastGameBtn = document.createElement('button');
continueLastGameBtn.textContent = 'Continue last game';
continueLastGameBtn.className = 'buttonEl';

saveGameContainer.append(saveGameBtn, continueLastGameBtn);

const toggleLabel = document.createElement('div');
toggleLabel.className = 'btnContainerToggle';
const paragraf = document.createElement('p');
paragraf.innerText = 'Theme';
const paragraf2 = document.createElement('p');
paragraf2.innerText = 'Sound';
toggleLabel.append(paragraf, paragraf2);
const toggleContainer = document.createElement('div');
toggleContainer.className = 'btnContainerToggle';
const toggleContainerTheme = document.createElement('label');
toggleContainerTheme.className = 'toggleContainer';
const toggleCheckbox = document.createElement('input');
toggleCheckbox.className = 'toggleChackBox';
toggleCheckbox.type = 'checkbox';
const toggleSlider = document.createElement('span');
toggleSlider.className = 'toggleSlider';
toggleCheckbox.addEventListener('change', () => {
  if (toggleCheckbox.checked) {
    toggleSlider.classList.add('checked');
    theme = 'dark';
  } else {
    toggleSlider.classList.remove('checked');
    theme = 'light';
  }
  document.documentElement.dataset.theme = theme;
  const body = document.querySelector('.bodyEl');
  if (theme === 'dark') {
    body.className = 'bodyEl backgroundDark';
  } else {
    body.className = 'bodyEl backgroundLight';
  }
  render(canvas, context, cellSize, gridColors, titleSize, solutionArr, theme);
});
const toggleContainerSound = document.createElement('label');
toggleContainerSound.className = 'toggleContainer';
const toggleCheckbox2 = document.createElement('input');
toggleCheckbox2.className = 'toggleChackBox';
toggleCheckbox2.type = 'checkbox';
const toggleSlider2 = document.createElement('span');
toggleSlider2.className = 'toggleSlider';
toggleCheckbox2.addEventListener('change', () => {
  if (toggleCheckbox2.checked) {
    toggleSlider2.classList.add('checked');
    isSound = false;
  } else {
    toggleSlider2.classList.remove('checked');
    isSound = true;
  }
});

toggleContainerTheme.append(toggleCheckbox, toggleSlider);
toggleContainerSound.append(toggleCheckbox2, toggleSlider2);
toggleContainer.append(toggleContainerTheme, toggleContainerSound);

const randomGame = document.createElement('button');
randomGame.textContent = 'Random game';
randomGame.className = 'buttonEl';

controlsContainer.append(
  timer,
  startBtnContainer,
  selectContainer,
  showContainer,
  saveGameContainer,
  toggleLabel,
  toggleContainer,
  randomGame
);
canvasContainer.append(canvas, controlsContainer);

function canvasProperty(size) {
  canvas.width = size + titleSize;
  canvas.height = size + titleSize;
  cellSize = size / cellCount;
  render(canvas, context, cellSize, gridColors, titleSize, solutionArr, theme);
}

function resizeCanvas(size) {
  canvasSize = size;
  canvasProperty(size);
}

function updateCanvasSize() {
  if (window.innerWidth <= 580) {
    resizeCanvas(210);
  }
  if (window.innerWidth <= 820 && window.innerWidth > 580) {
    resizeCanvas(300);
  }
  if (window.innerWidth <= 950 && window.innerWidth > 820) {
    resizeCanvas(420);
  }
  if (window.innerWidth > 950) {
    resizeCanvas(600);
  }
}
updateCanvasSize();
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
function clearGrid() {
  gridColors = Array.from({ length: cellCount }, () =>
    Array(cellCount).fill(0)
  );
}
function showMessage(message) {
  const helpParagraf = document.createElement('p');
  helpParagraf.className = 'helpMessage';
  helpParagraf.innerText = message;
  canvasContainer.appendChild(helpParagraf);
  setTimeout(() => canvasContainer.removeChild(helpParagraf), 3000);
}
function clearSelectors(index) {
  selectors.forEach((el) => {
    const opt = el;
    if (el !== selectors[index]) {
      opt.value = '';
    }
  });
}
function resturtTimer() {
  const isWinGame = isMatrixEqual(gridColors, solutionArr);
  if (!isWinGame) {
    isGameBegin = true;
    isTimerBegin = false;
    clearGrid();
  }
  stopTimer();
  resetTimer();
}

const handleMouseClick = (event) => {
  if (!matrix) {
    showMessage(
      'First choose the option you want to solve and then press the start button'
    );
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
    if (clickSoundL !== null && isSound) {
      clickSoundL.play();
    }
    render(
      canvas,
      context,
      cellSize,
      gridColors,
      titleSize,
      solutionArr,
      theme
    );
    const isWinGame = isMatrixEqual(gridColors, solutionArr);
    if (isWinGame) {
      const tempResults = results.length >= 5 ? results.slice(1) : results;
      const solwedGame = matrix.split(' ');
      const solwedGameTime = minutes * 60 + seconds;
      tempResults.push([solwedGameTime, solwedGame[0], solwedGame[2]]);
      results = tempResults;
      localStorage.setItem('results', JSON.stringify(tempResults));

      const modalContainer = document.createElement('div');
      const wrapper = document.createElement('div');
      wrapper.className = 'wrapper';
      const modalEl = document.createElement('div');
      modalEl.className = 'modalContainer';
      const message = document.createElement('p');
      message.innerText = `Great! You have solved the nonogram in ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} seconds!`;
      const closeBtn = document.createElement('button');
      closeBtn.className = 'closeBtn';
      closeBtn.innerHTML = `<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 16.8507L17 2.00001" stroke="#0C0C0E" stroke-width="3"/>
      <path d="M2 2.14928L17 17" stroke="#0C0C0E" stroke-width="3"/>
      </svg>`;
      closeBtn.addEventListener('click', () => {
        document.body.removeChild(modalContainer);
        resetTimer();
        isTimerBegin = false;
      });
      wrapper.addEventListener('click', () => {
        document.body.removeChild(modalContainer);
        resetTimer();
        isTimerBegin = false;
      });
      modalEl.append(message, closeBtn);
      modalContainer.append(wrapper, modalEl);
      document.body.appendChild(modalContainer);
      isGameBegin = false;
      stopTimer();
      if (clickSoundApplause !== null && isSound) {
        clickSoundApplause.play();
      }
      showAnswerBtn.disabled = true;
    }
  }
};
const handleContextMenu = (event) => {
  event.preventDefault();
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
      if (gridColors[gridX][gridY] === 0 || gridColors[gridX][gridY] === 1) {
        gridColors[gridX][gridY] = 2;
      } else if (gridColors[gridX][gridY] === 2) {
        gridColors[gridX][gridY] = 0;
      }
    }
    if (clickSoundR !== null && isSound) {
      clickSoundR.play();
    }
    render(
      canvas,
      context,
      cellSize,
      gridColors,
      titleSize,
      solutionArr,
      theme
    );
  }
};

function StartGame(value) {
  if (value) {
    clearGrid();
    const valueAddr = value.split(' ');
    const arr = solutions[valueAddr[0]][valueAddr[1]][valueAddr[2]];
    isGameBegin = true;
    solutionArr = arr;
    updateCanvasSize();
    render(
      canvas,
      context,
      cellSize,
      gridColors,
      titleSize,
      solutionArr,
      theme
    );
    showAnswerBtn.disabled = false;
  }
}

canvas.addEventListener('click', handleMouseClick);
canvas.addEventListener('contextmenu', handleContextMenu);
window.addEventListener('resize', updateCanvasSize);

playBtn.addEventListener('click', () => {
  resturtTimer();
  playBtn.disabled = true;
  StartGame(matrix);
});
restartBtn.addEventListener('click', () => {
  resturtTimer();
  render(canvas, context, cellSize, gridColors, titleSize, solutionArr, theme);
});
showAnswerBtn.addEventListener('click', () => {
  gridColors = solutionArr;
  render(canvas, context, cellSize, gridColors, titleSize, solutionArr, theme);
  isGameBegin = false;
  stopTimer();
  showAnswerBtn.disabled = true;
});
saveGameBtn.addEventListener('click', () => {
  if (isGameBegin) {
    localStorage.setItem(
      'saved_game',
      JSON.stringify([cellSize, titleSize, minutes, seconds, matrix])
    );
    localStorage.setItem('saved_game_answ', JSON.stringify(gridColors));
    localStorage.setItem('saved_game_quest', JSON.stringify(solutionArr));
  } else {
    showMessage('No game started yet');
  }
});
continueLastGameBtn.addEventListener('click', () => {
  const solutionArrSaved = localStorage.getItem('saved_game_quest');
  const gridColorsSaved = localStorage.getItem('saved_game_answ');
  if (solutionArrSaved && gridColorsSaved) {
    resturtTimer();
    isGameBegin = true;
    solutionArr = JSON.parse(solutionArrSaved);
    gridColors = JSON.parse(gridColorsSaved);
    [cellSize, titleSize, minutes, seconds, matrix] = JSON.parse(
      localStorage.getItem('saved_game')
    );
    updateTimerDisplay();
    const index1 = lvl.indexOf(matrix.split(' ')[0]);
    const index2 = parseInt(matrix.split(' ')[1], 10);
    selectors[index1][index2 + 1].selected = true;
    clearSelectors(index1);
    render(
      canvas,
      context,
      cellSize,
      gridColors,
      titleSize,
      solutionArr,
      theme
    );
    showAnswerBtn.disabled = false;
  } else {
    showMessage('No game saved yet');
  }
});
document.addEventListener('DOMContentLoaded', () => {
  clickSoundL = new Audio('./assets/clickL.mp3');
  clickSoundR = new Audio('./assets/clickR.mp3');
  clickSoundApplause = new Audio('./assets/applause.mp3');
});
showResultsBtn.addEventListener('click', () => {
  const modalContainer = document.createElement('div');
  const wrapper = document.createElement('div');
  wrapper.className = 'wrapper';
  const modalEl = document.createElement('div');
  modalEl.className = 'modalContainer';
  if (results.length > 0) {
    results.sort((a, b) => Number(a[0]) - Number(b[0]));
    results.forEach((el, i) => {
      const message = document.createElement('p');
      message.innerText = `${i + 1}. difficult: ${el[1]}; name: ${el[2]}; time: ${String(Math.floor(el[0] / 60)).padStart(2, '0')}:${String(el[0] % 60).padStart(2, '0')}`;
      modalEl.append(message);
    });
  } else {
    const message = document.createElement('p');
    message.innerText = 'no results yet';
    modalEl.append(message);
  }
  const closeBtn = document.createElement('button');
  closeBtn.className = 'closeBtn';
  closeBtn.innerHTML = `<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M2 16.8507L17 2.00001" stroke="#0C0C0E" stroke-width="3"/>
  <path d="M2 2.14928L17 17" stroke="#0C0C0E" stroke-width="3"/>
  </svg>`;
  wrapper.addEventListener('click', () => {
    document.body.removeChild(modalContainer);
    resetTimer();
    isTimerBegin = false;
  });
  closeBtn.addEventListener('click', () => {
    document.body.removeChild(modalContainer);
  });
  modalEl.append(closeBtn);
  modalContainer.append(wrapper, modalEl);
  document.body.appendChild(modalContainer);
});
randomGame.addEventListener('click', () => {
  const indexLvl = Math.floor(Math.random() * lvl.length);
  const indexGame = Math.floor(Math.random() * solutions[lvl[indexLvl]].length);
  matrix = `${lvl[indexLvl]} ${indexGame} ${Object.keys(solutions[lvl[indexLvl]][indexGame])}`;

  lvlCheck(lvl[indexLvl]);
  selectors[indexLvl][indexGame + 1].selected = true;
  clearSelectors(indexLvl);
  resturtTimer();
  StartGame(matrix);
});
selectors[0][1].selected = true;
StartGame(matrix);
render(canvas, context, cellSize, gridColors, titleSize, solutionArr, theme);
