function Note({ note, toggleNoteImportance, deleteNote }) {
  const label = note.important ? "make not important" : "make important";

  return (
    <li className="note">
      {note.content}
      <div className="note-button">
        <button type="button" onClick={toggleNoteImportance}>
          {label}
        </button>
      </div>
      <div className="note-button">
        <button type="button" onClick={deleteNote}>
          delete
        </button>
      </div>
    </li>
  );
}

export default Note;
