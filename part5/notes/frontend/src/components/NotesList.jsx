import Note from "./Note";
import Footer from "./Footer";
import NoteForm from "./NoteForm";
import noteService from "../services/notes";
import Togglable from "./Togglable";
import { useState, useEffect, useRef } from "react";
const NotesList = ({ setErrorMessage }) => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);

  const showNotesForm = useRef();
  const addNote = async (noteObject) => {
    try {
      const returnedNote = await noteService.create(noteObject);
      setNotes(notes.concat(returnedNote));
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } finally {
      showNotesForm.current.toggleForm();
    }
  };

  const toggleImportanceOf = async (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    try {
      const returnedNote = await noteService.update(id, changedNote);
      if (!returnedNote) {
        setErrorMessage(
          `Note '${changedNote.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      } else {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

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
      <Togglable buttonLabel={"new note"} ref={showNotesForm}>
        <NoteForm addNote={addNote}></NoteForm>
      </Togglable>
      <Footer />
    </div>
  );
};

export default NotesList;
