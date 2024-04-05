import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import Filter from "./components/Filter";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { initializeNotes } from "./reducers/noteReducer";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeNotes());
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
