import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import Filter from "./components/Filter";
import { useDispatch } from "react-redux";
import { setNotes } from "./reducers/noteReducer";
import { useEffect } from "react";
import noteService from "./services/notes";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    noteService.getAll().then((notes) => dispatch(setNotes(notes)));
  }, []);

  return (
    <div>
      <NoteForm />
      <Filter />
      <NoteList />
    </div>
  );
};

export default App;
