import { toggleImportanceOf } from "./actions/actions";
import { useSelector, useDispatch } from "react-redux";
import NoteForm from "./components/NoteForm";

const App = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => {
    return state;
  });

  const toggleImportanceof = (note) => {
    dispatch(toggleImportanceOf(note));
  };

  return (
    <div>
      <NoteForm></NoteForm>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            {note.content}{" "}
            <strong>{note.important ? "important" : "not important"}</strong>
            <button onClick={() => toggleImportanceof(note)}>toggle</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
