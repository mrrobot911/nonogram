export default function drawGrid(
  canvas,
  context,
  cellSize,
  gridColors,
  TITLE_SIZE
) {
  const CELL_COUNT_X = Math.floor((canvas.width - TITLE_SIZE) / cellSize);
  const CELL_COUNT_Y = Math.floor((canvas.height - TITLE_SIZE) / cellSize);

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'black';
  context.font = 'bold 14px Arial';

  // Отрисовка подсказок по строкам
  for (let i = 0; i < CELL_COUNT_X; i += 1) {
    const hint = '1 1 1 1';
    const x = (i + 1) * cellSize + TITLE_SIZE - 20;
    const y = cellSize / 2;

    hint.split(' ').forEach((part, index) => {
      context.fillText(part, x, y + index * 15);
    });
  }

  for (let j = 0; j < CELL_COUNT_Y; j += 1) {
    const hint = '2 2 2 2';
    const x = 5;
    const y = (j + 1) * cellSize + TITLE_SIZE - 10;

    context.fillText(hint, x, y);
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
        context.fillStyle =
          gridColors[(x - TITLE_SIZE) / cellSize][(y - TITLE_SIZE) / cellSize];
        context.fillRect(x, y, cellSize, cellSize);
      }
      context.lineWidth = 1;
      context.strokeStyle = '#ccc';
    }
  }
}
