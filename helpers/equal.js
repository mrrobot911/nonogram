export default function isMatrixEqual(matrix1, matrix2) {
  for (let i = 0; i < matrix1.length; i += 1) {
    for (let j = 0; j < matrix1[i].length; j += 1) {
      if (matrix1[i][j] !== 2 && matrix1[i][j] !== matrix2[i][j]) {
        return false;
      }
    }
  }

  return true;
}
