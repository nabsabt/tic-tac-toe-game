import "./GameBoard.css";

const initialGameBoardField = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, turns }) {
  let gameboard = initialGameBoardField;

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, column } = square;
    gameboard[row][column] = player;
  }

  return (
    <ol className="d-flex flex-column justify-content-between p-0 m-3 gap-1">
      {/* Game board content goes here */}
      {gameboard.map((row, rowIndex) => (
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
