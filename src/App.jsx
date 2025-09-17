import "./App.css";
import Player from "./components/Player/Player";
import GameBoard from "./components/GameBoard/GameBoard";
import { useState } from "react";
import Log from "./components/Log/Log";
import GameOver from "./components/GameOverDialog/GameOver";
import { WINNING_COMBINATIONS } from "./winning_combination";

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

const initialGameBoardField = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState({
    X: "Player 1",
    O: "Player 2",
  });

  /**
   * like this, we create a deep copy of the initial game board,
   *  so we don't modify the original one->
   */
  let gameboard = [...initialGameBoardField.map((array) => [...array])];
  let winner;
  const isDrawGame = gameTurns.length === 9 && !winner;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, column } = square;
    gameboard[row][column] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameboard[combination[0].row][combination[0].column];
    const secondSquare = gameboard[combination[1].row][combination[1].column];
    const thirdSquare = gameboard[combination[2].row][combination[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    ) {
      winner = firstSquare;
    }
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTerms = [
        { square: { row: rowIndex, column: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTerms;
    });
  }

  function handlePlayernameChange(playerSymbol, newPlayername) {
    setPlayerNames((prevNames) => {
      return { ...prevNames, [playerSymbol]: newPlayername };
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }
  return (
    <main className="d-flex flex-column align-items-center">
      {/* Game Container Div */}
      <div className="game-container">
        {/* List of players */}
        <em>Active player: {playerNames[deriveActivePlayer(gameTurns)]}</em>
        <ol className=" d-flex align-items-center justify-content-center">
          <Player
            initialPlayerName="Player 1"
            playerSymbol="X"
            isActive={deriveActivePlayer(gameTurns) === "X"}
            onSubmitPlayerName={handlePlayernameChange}
          />
          <Player
            initialPlayerName="Player 2"
            playerSymbol="O"
            isActive={deriveActivePlayer(gameTurns) === "O"}
            onSubmitPlayerName={handlePlayernameChange}
          />
        </ol>
      </div>
      <GameBoard onSelectSquare={handleSelectSquare} board={gameboard} />
      <Log gamestate={gameTurns} players={playerNames} />
      {(winner || isDrawGame) && (
        <GameOver winner={playerNames[winner]} onRestartGame={handleRestart} />
      )}
    </main>
  );
}

export default App;
