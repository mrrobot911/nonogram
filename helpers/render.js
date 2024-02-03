export default function render(
  canvas,
  context,
  cellSize,
  gridColors,
  TITLE_SIZE,
  arr
) {
  const CELL_COUNT_X = Math.floor((canvas.width - TITLE_SIZE) / cellSize);
  const CELL_COUNT_Y = Math.floor((canvas.height - TITLE_SIZE) / cellSize);

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#000000';

  context.font = `bold 16px Arial`;

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
    const x = (i + 1) * cellSize + TITLE_SIZE - cellSize / 2;
    const y = 20;

    hint.forEach((part, index) => {
      context.fillText(part, x, y + index * 16);
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
    const y = (j + 1) * cellSize + TITLE_SIZE - cellSize / 2;

    context.fillText(hint.join(' '), x, y);
  }

  // Отрисовка линий между подсказками
  for (let i = 0; i <= CELL_COUNT_X + 1; i += 1) {
    context.beginPath();
    context.moveTo(i === 0 ? 0 : cellSize * (i - 1) + TITLE_SIZE, 0);
    context.lineTo(
      i === 0 ? 0 : cellSize * (i - 1) + TITLE_SIZE,
      canvas.height
    );
    context.lineWidth = 3;
    context.strokeStyle = '#ccc';
    context.stroke();
  }

  for (let i = 0; i <= CELL_COUNT_Y + 1; i += 1) {
    context.beginPath();
    context.moveTo(0, i === 0 ? 0 : cellSize * (i - 1) + TITLE_SIZE);
    context.lineTo(canvas.width, i === 0 ? 0 : cellSize * (i - 1) + TITLE_SIZE);
    context.lineWidth = 3;
    context.strokeStyle = '#ccc';
    context.stroke();
  }

  for (let x = TITLE_SIZE; x <= canvas.width; x += cellSize) {
    for (let y = TITLE_SIZE; y <= canvas.height; y += cellSize) {
      context.beginPath();
      context.moveTo(x, TITLE_SIZE);
      context.lineTo(x, canvas.height);

      if ((x - TITLE_SIZE) % (cellSize * 5) === 0) {
        context.lineWidth = 3;
        context.strokeStyle = '#ccc';
      } else {
        context.lineWidth = 1;
        context.strokeStyle = '#ccc';
      }
      context.stroke();

      context.beginPath();
      context.moveTo(TITLE_SIZE, y);
      context.lineTo(canvas.width, y);

      if ((y - TITLE_SIZE) % (cellSize * 5) === 0) {
        context.lineWidth = 3;
        context.strokeStyle = '#ccc';
      } else {
        context.lineWidth = 1;
        context.strokeStyle = '#ccc';
      }
      context.stroke();
      if (x < canvas.width && y < canvas.height) {
        if (
          gridColors[(x - TITLE_SIZE) / cellSize][
            (y - TITLE_SIZE) / cellSize
          ] === 1
        ) {
          context.fillStyle = '#000000';
          context.fillRect(x, y, cellSize, cellSize);
        } else if (
          gridColors[(x - TITLE_SIZE) / cellSize][
            (y - TITLE_SIZE) / cellSize
          ] === 2
        ) {
          context.fillStyle = '#ffffff';
          context.fillRect(x, y, cellSize, cellSize);
          context.lineWidth = 4;
          context.strokeStyle = '#000000';

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
          context.fillStyle = '#ffffff';
          context.fillRect(x, y, cellSize, cellSize);
        }
      }
      context.lineWidth = 1;
      context.strokeStyle = '#ccc';
    }
  }
}
