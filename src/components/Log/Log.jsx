export default function Log({ gamestate, players }) {
  return (
    <ol>
      {gamestate.map((turn, key) => (
        <li
          key={key}
          className={key !== 0 ? "text-secondary" : "text-success fw-bold"}
          style={{ opacity: 1 - key * 0.2 }}
        >
          {players[turn?.player]} selected {turn?.square.row + 1}.row,
          {turn?.square.column + 1}.column.
        </li>
      ))}
    </ol>
  );
}
