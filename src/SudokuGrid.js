import React from "react";

const SudokuGrid = ({ grid, onInputChange }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(9, 40px)" }}>
      {grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <input
            key={`${rowIndex}-${colIndex}`}
            type="number"
            min="1"
            max="9"
            value={cell || ""}
            onChange={(e) => onInputChange(rowIndex, colIndex, e.target.value)}
            style={{ width: "40px", height: "40px", textAlign: "center" }}
          />
        ))
      )}
    </div>
  );
};

export default SudokuGrid;
