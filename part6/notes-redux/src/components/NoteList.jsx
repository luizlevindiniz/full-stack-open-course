import { toggleImportanceOf } from "../actions/actions";
import { useSelector, useDispatch } from "react-redux";
import Note from "./Note";

const NoteList = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => {
    return state;
  });

  const handleToggle = (note) => {
    dispatch(toggleImportanceOf(note));
  };

  return (
    <ul>
      {notes.map((note) => (
        <Note note={note} onClick={handleToggle}></Note>
      ))}
    </ul>
  );
};

export default NoteList;
