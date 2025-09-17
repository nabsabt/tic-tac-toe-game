import "./player.css";
import { useState } from "react";

export default function Player({ initialPlayerName, playerSymbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [enteredPlayername, setPlayernameState] = useState(initialPlayerName);

  let playername = (
    <span className="player-name me-4">{enteredPlayername}:</span>
  );
  if (isEditing) {
    playername = (
      <input
        className="player-name"
        type="text"
        value={enteredPlayername}
        required
        onChange={changePlayername}
      />
    );
  }

  return (
    <li
      className={`mx-5 d-flex align-items-center highlight-player ${
        isActive ? "rounded border border-warning p-1" : ""
      }`}
    >
      <div className="player-indicator ">
        {playername}
        <span className="player-symbol  ">{playerSymbol}</span>
      </div>
      <button onClick={onEditPlayername} className="mx-2">
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );

  function changePlayername(event) {
    setPlayernameState(event.target.value);
  }

  function onEditPlayername() {
    if (isEditing) {
      setPlayernameState(enteredPlayername);
      setIsEditing((prev) => !prev);
    } else {
      setIsEditing((prev) => !prev);
    }
  }
}
