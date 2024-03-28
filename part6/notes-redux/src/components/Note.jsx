const Note = ({ note, onClick }) => {
  return (
    <li key={note.id}>
      {note.content}{" "}
      <strong>{note.important ? "important" : "not important"}</strong>
      <button onClick={() => onClick(note)}>toggle</button>
    </li>
  );
};

export default Note;
