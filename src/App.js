import React, { useState } from "react";
import SudokuGrid from "./SudokuGrid";
import { validateSudoku, solveSudoku } from "./Solvers";
import "./App.css";

const App = () => {
  const [grid, setGrid] = useState(
    Array(9)
      .fill()
      .map(() => Array(9).fill(0))
  );
  const [error, setError] = useState("");

  const handleInputChange = (row, col, value) => {
    const newGrid = grid.map((r) => [...r]);
    newGrid[row][col] = parseInt(value) || 0;
    setGrid(newGrid);
  };

  const handleValidate = () => {
    if (validateSudoku(grid)) {
      setError("Valid Sudoku setup!");
    } else {
      setError("Invalid Sudoku setup! Please fix errors.");
    }
  };

  const handleSolve = () => {
    const solvedGrid = grid.map((r) => [...r]);
    if (validateSudoku(grid) && solveSudoku(solvedGrid)) {
      setGrid(solvedGrid);
      setError("Sudoku solved!");
    } else {
      setError("Unable to solve Sudoku. Please check your inputs.");
    }
  };

  return (
    <div>
      <h1>Sudoku Solver</h1>
      <SudokuGrid grid={grid} onInputChange={handleInputChange} />
      <button onClick={handleValidate}>Validate</button>
      <button onClick={handleSolve}>Solve</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default App;
