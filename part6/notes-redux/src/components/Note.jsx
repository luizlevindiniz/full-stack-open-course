const Note = ({ note, onClick }) => {
  return (
    <li>
      {note.content}{" "}
      <strong>{note.important ? "important" : "not important"}</strong>
      <button onClick={() => onClick(note)}>toggle</button>
    </li>
  );
};

export default Note;
