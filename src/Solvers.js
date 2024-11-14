export const validateSudoku = (grid) => {
  const isValid = (arr) => {
    const nums = arr.filter((num) => num !== 0);
    return nums.length === new Set(nums).size;
  };

  for (let i = 0; i < 9; i++) {
    if (!isValid(grid[i])) return false; // Check rows
    if (!isValid(grid.map((row) => row[i]))) return false; // Check columns
  }

  for (let r = 0; r < 9; r += 3) {
    for (let c = 0; c < 9; c += 3) {
      const block = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          block.push(grid[r + i][c + j]);
        }
      }
      if (!isValid(block)) return false; // Check 3x3 blocks
    }
  }

  return true;
};
const findEmpty = (grid) => {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (grid[r][c] === 0) return [r, c];
    }
  }
  return null;
};

const isValidPlacement = (grid, row, col, num) => {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num || grid[i][col] === num) return false;
    const startRow = 3 * Math.floor(row / 3);
    const startCol = 3 * Math.floor(col / 3);
    if (grid[startRow + Math.floor(i / 3)][startCol + (i % 3)] === num)
      return false;
  }
  return true;
};

export const solveSudoku = (grid) => {
  const empty = findEmpty(grid);
  if (!empty) return true;
  const [row, col] = empty;

  for (let num = 1; num <= 9; num++) {
    if (isValidPlacement(grid, row, col, num)) {
      grid[row][col] = num;
      if (solveSudoku(grid)) return true;
      grid[row][col] = 0;
    }
  }
  return false;
};
