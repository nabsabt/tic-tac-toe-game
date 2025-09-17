import "./GameBoard.css";

export default function GameBoard({ onSelectSquare, board }) {
  return (
    <ol className="d-flex flex-column justify-content-between p-0 m-3 gap-1">
      {/* Game board content goes here */}
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol className="d-flex flex-row">
            {row.map((playerSymbol, cellIndex) => (
              <li key={cellIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, cellIndex)}
                  className="field-button mx-1 "
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
