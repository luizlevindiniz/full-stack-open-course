import { toggleImportanceOf } from "../reducers/noteReducer";
import { useSelector, useDispatch } from "react-redux";
import Note from "./Note";
import noteService from "../services/notes";

const NoteList = () => {
  const dispatch = useDispatch();

  const notes = useSelector(({ filter, notes }) => {
    if (filter === "ALL") {
      return notes;
    }
    return filter === "IMPORTANT"
      ? notes.filter((note) => note.important)
      : notes.filter((note) => !note.important);
  });

  const handleToggle = async (note) => {
    const changedNote = await noteService.toggleNote(note);
    dispatch(toggleImportanceOf(changedNote));
  };

  return (
    <ul>
      {notes.map((note) => (
        <Note key={note.id} note={note} onClick={handleToggle}></Note>
      ))}
    </ul>
  );
};

export default NoteList;
