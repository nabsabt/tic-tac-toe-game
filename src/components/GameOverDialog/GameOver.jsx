import "./gameOver.css";
export default function GameOver({ winner, onRestartGame }) {
  return (
    <div className="dialog-container">
      <h1>Game over!</h1>
      <h3>{winner ? `The winner is ${winner}` : "Draw game!"}</h3>
      <button
        className="btn btn-primary"
        /*  onClick={() => window.location.reload()} */
        onClick={onRestartGame}
      >
        Restart
      </button>
    </div>
  );
}
