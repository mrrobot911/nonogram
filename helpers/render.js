export default function render(
  canvas,
  context,
  cellSize,
  gridColors,
  titleSize,
  arr,
  theme
) {
  const CELL_COUNT_X = Math.floor((canvas.width - titleSize) / cellSize);
  const CELL_COUNT_Y = Math.floor((canvas.height - titleSize) / cellSize);

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = theme === 'light' ? '#000000' : '#8b00ff';

  context.font = cellSize > 28 ? `bold 16px Arial` : `bold 14px Arial`;

  // Отрисовка подсказок по строкам
  for (let i = 0; i < CELL_COUNT_X; i += 1) {
    let count = 0;
    const hint = [];
    for (let j = 0; j < CELL_COUNT_Y; j += 1) {
      if (arr[i][j] === 1) {
        count += 1;
      }
      if (
        (count > 0 && arr[i][j] === 0) ||
        (count > 0 && j === CELL_COUNT_Y - 1)
      ) {
        hint.push(count);
        count = 0;
      }
    }
    const x =
      (i + 1) * cellSize +
      titleSize -
      (cellSize > 30 ? cellSize / 2 : cellSize / 1.5);
    const y = 20;

    hint.forEach((part, index) => {
      context.fillText(part, x, y + index * (cellSize > 28 ? 16 : 14));
    });
  }

  for (let j = 0; j < CELL_COUNT_Y; j += 1) {
    let count = 0;
    const hint = [];
    for (let i = 0; i < CELL_COUNT_X; i += 1) {
      if (arr[i][j] === 1) {
        count += 1;
      }
      if (
        (count > 0 && arr[i][j] === 0) ||
        (count > 0 && i === CELL_COUNT_Y - 1)
      ) {
        hint.push(count);
        count = 0;
      }
    }
    const x = cellSize / 10;
    const y =
      (j + 1) * cellSize +
      titleSize -
      (cellSize > 28 ? cellSize / 2 : cellSize / 4);

    context.fillText(hint.join(' '), x, y);
  }

  // Отрисовка линий между подсказками
  for (let i = 0; i <= CELL_COUNT_X + 1; i += 1) {
    context.beginPath();
    context.moveTo(i === 0 ? 0 : cellSize * (i - 1) + titleSize, 0);
    context.lineTo(i === 0 ? 0 : cellSize * (i - 1) + titleSize, canvas.height);
    context.lineWidth = 3;
    context.strokeStyle = theme === 'light' ? '#ccc' : '#2F70AF';
    context.stroke();
  }

  for (let i = 0; i <= CELL_COUNT_Y + 1; i += 1) {
    context.beginPath();
    context.moveTo(0, i === 0 ? 0 : cellSize * (i - 1) + titleSize);
    context.lineTo(canvas.width, i === 0 ? 0 : cellSize * (i - 1) + titleSize);
    context.lineWidth = 3;
    context.strokeStyle = theme === 'light' ? '#ccc' : '#2F70AF';
    context.stroke();
  }

  for (let x = titleSize; x <= canvas.width; x += cellSize) {
    for (let y = titleSize; y <= canvas.height; y += cellSize) {
      context.beginPath();
      context.moveTo(x, titleSize);
      context.lineTo(x, canvas.height);

      if ((x - titleSize) % (cellSize * 5) === 0) {
        context.lineWidth = 3;
        context.strokeStyle = theme === 'light' ? '#ccc' : '#2F70AF';
      } else {
        context.lineWidth = 1;
        context.strokeStyle = theme === 'light' ? '#ccc' : '#2F70AF';
      }
      context.stroke();

      context.beginPath();
      context.moveTo(titleSize, y);
      context.lineTo(canvas.width, y);

      if ((y - titleSize) % (cellSize * 5) === 0) {
        context.lineWidth = 3;
        context.strokeStyle = theme === 'light' ? '#ccc' : '#2F70AF';
      } else {
        context.lineWidth = 1;
        context.strokeStyle = theme === 'light' ? '#ccc' : '#2F70AF';
      }
      context.stroke();

      if (x < canvas.width && y < canvas.height && gridColors.length > 0) {
        if (
          gridColors[(x - titleSize) / cellSize][(y - titleSize) / cellSize] ===
          1
        ) {
          context.fillStyle = theme === 'light' ? '#000000' : '#8b00ff';
          context.fillRect(x, y, cellSize, cellSize);
        } else if (
          gridColors[(x - titleSize) / cellSize][(y - titleSize) / cellSize] ===
          2
        ) {
          context.fillStyle = theme === 'light' ? '#ffffff' : '#02315E';
          context.fillRect(x, y, cellSize, cellSize);
          context.lineWidth = 4;
          context.strokeStyle = theme === 'light' ? '#000000' : '#8b00ff';

          context.fillRect(x, y, cellSize, cellSize);
          context.beginPath();
          context.moveTo(x + (4 * cellSize) / 5, y + (4 * cellSize) / 5);
          context.lineTo(x + cellSize / 5, y + cellSize / 5);
          context.stroke();

          context.beginPath();
          context.moveTo(x + cellSize / 5, y + (4 * cellSize) / 5);
          context.lineTo(x + (4 * cellSize) / 5, y + cellSize / 5);
          context.stroke();
        } else {
          context.fillStyle = theme === 'light' ? '#ffffff' : '#02315E';
          context.fillRect(x, y, cellSize, cellSize);
        }
      }
      context.lineWidth = 1;
      context.strokeStyle = theme === 'light' ? '#ccc' : '#2F70AF';
    }
  }
}
