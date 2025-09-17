import "./App.css";
import Player from "./components/Player/Player";
import GameBoard from "./components/GameBoard/GameBoard";
import { useState } from "react";
import Log from "./components/Log/Log";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState("X");

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((currActive) => (currActive === "X" ? "O" : "X"));
    setGameTurns((prevTurns) => {
      let currentPlayer = activePlayer;
      if (prevTurns.length > 0 && prevTurns[0].player === "X") {
        currentPlayer = "O";
      }
      const updatedTerms = [
        { square: { row: rowIndex, column: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTerms;
    });
  }

  return (
    <main className="d-flex flex-column align-items-center">
      {/* Game Container Div */}
      <div className="game-container">
        {/* List of players */}
        <em>Active player: {activePlayer}</em>
        <ol className=" d-flex align-items-center justify-content-center">
          <Player
            initialPlayerName="Player 1"
            playerSymbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialPlayerName="Player 2"
            playerSymbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
      </div>
      <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
      <Log activePlayer={activePlayer} gamestate={gameTurns} />
    </main>
  );
}

export default App;
