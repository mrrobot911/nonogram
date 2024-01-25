export default function drawGrid(canvas, context, cellSize, gridColors) {
  for (let x = 0; x <= canvas.width; x += cellSize) {
    for (let y = 0; y <= canvas.height; y += cellSize) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, canvas.height);

      if (x % (cellSize * 5) === 0) {
        context.lineWidth = 3;
        context.strokeStyle = '#ccc';
      } else {
        context.lineWidth = 1;
        context.strokeStyle = '#ccc';
      }
      context.stroke();

      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(canvas.width, y);

      if (y % (cellSize * 5) === 0) {
        context.lineWidth = 3;
        context.strokeStyle = '#ccc';
      } else {
        context.lineWidth = 1;
        context.strokeStyle = '#ccc';
      }
      context.stroke();

      if (x < canvas.width && y < canvas.height) {
        context.fillStyle = gridColors[x / cellSize][y / cellSize];
        context.fillRect(x, y, cellSize, cellSize);
      }
      context.lineWidth = 1;
      context.strokeStyle = '#ccc';
    }
  }
}
