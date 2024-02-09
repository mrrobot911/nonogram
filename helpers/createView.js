import solutions from './solution.js';

export default function createView(canvasSize, titleSize) {
  const lvl = ['easy', 'medium', 'hard'];
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

  const toggleContainerSound = document.createElement('label');
  toggleContainerSound.className = 'toggleContainer';
  const toggleCheckbox2 = document.createElement('input');
  toggleCheckbox2.className = 'toggleChackBox';
  toggleCheckbox2.type = 'checkbox';
  const toggleSlider2 = document.createElement('span');
  toggleSlider2.className = 'toggleSlider';

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
  return {
    lvl,
    canvas,
    context,
    canvasContainer,
    toggleCheckbox,
    toggleSlider,
    toggleCheckbox2,
    toggleSlider2,
    selectors,
    playBtn,
    showAnswerBtn,
    restartBtn,
    timer,
    saveGameBtn,
    continueLastGameBtn,
    showResultsBtn,
    randomGame,
  };
}
