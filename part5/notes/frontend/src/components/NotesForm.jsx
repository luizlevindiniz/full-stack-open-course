import Note from "./Note";
import Footer from "./Footer";
const NotesForm = ({
  showAll,
  setShowAll,
  notesToShow,
  addNote,
  newNote,
  handleNoteChange,
  toggleImportanceOf,
}) => {
  return (
    <div>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default NotesForm;
