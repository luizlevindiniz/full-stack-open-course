import { useState, useEffect } from "react";
import {
  getAllNotes,
  createNote,
  updateNote,
  deleteNote,
} from "./services/notes";
import Note from "./components/Note";
import Button from "./components/Button";
import FormInput from "./components/FormInput";
import ErrorNotification from "./components/ErrorNotification";
import Footer from "./components/Footer";

const App = () => {
  const [notesList, setNotesList] = useState(null);
  const [newNote, setNewNote] = useState({ content: "", important: false });
  const [justImportantNotes, setJustImportantNotes] = useState(false);
  const [errMessage, setErrMessage] = useState(null);

  const handleNewNoteChange = (event) => {
    if (event.target.id === "isImportant") {
      setNewNote({ ...newNote, important: event.target.checked });
    } else {
      setNewNote({ ...newNote, content: event.target.value });
    }
  };

  // POST note to db.json
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const createdNote = await createNote(newNote);
      setNotesList(notesList.concat(createdNote));
    } catch (err) {
      console.log(err);
      setErrMessage("Error while creating note!");
      setInterval(() => setErrMessage(null), 5000);
    } finally {
      setNewNote({ content: "", important: newNote.important });
    }
  };

  // DELETE note from db.json
  const handleDelete = async (id) => {
    try {
      const deletedNote = await deleteNote(id);
      setNotesList(
        notesList.filter((note) => note && note.id != deletedNote.id)
      );
    } catch (err) {
      console.log(err);
      setErrMessage("Error while deleting note!");
      setInterval(() => setErrMessage(null), 5000);
    }
  };

  // PUT note to db.json
  const toggleNoteImportance = async (id) => {
    const note = notesList.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };

    try {
      const updatedNote = await updateNote(changedNote);
      setNotesList(
        notesList.map((note) => (note.id === id ? updatedNote : note))
      );
    } catch (err) {
      console.log(err);
      setErrMessage("Error while updating note!");
      setInterval(() => setErrMessage(null), 5000);
    }
  };

  // GET notes from db.json
  const getNotes = async () => {
    try {
      const notes = await getAllNotes();
      setNotesList(notes);
    } catch (err) {
      console.log(err);
      setErrMessage("Error while updating note!");
      setInterval(() => setErrMessage(null), 5000);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  // Notes to display based on filter criteria
  const notesToShow = justImportantNotes
    ? notesList.filter((note) => note.important)
    : notesList;

  // Render Component
  if (!notesToShow) {
    return null;
  } else {
    return (
      <div>
        <h1>Notes</h1>
        <ErrorNotification message={errMessage}></ErrorNotification>
        <label htmlFor="showImportant">Show Just Important</label>
        <input
          type="checkbox"
          name="showImportant"
          id="showImportant"
          onClick={() => setJustImportantNotes(!justImportantNotes)}
        />
        <ul id="notesToShow">
          {notesToShow.map((note) => {
            return (
              <Note
                key={note.id}
                note={note}
                toggleNoteImportance={() => toggleNoteImportance(note.id)}
                deleteNote={() => handleDelete(note.id)}
              ></Note>
            );
          })}
        </ul>
        <form id="formNotes" action="/" method="post" onSubmit={handleSubmit}>
          <div>
            <FormInput
              type="text"
              name="newNote"
              id="newNote"
              label="Add New Note "
              value={newNote.content}
              onChange={handleNewNoteChange}
            ></FormInput>
          </div>
          <div>
            <FormInput
              type="checkbox"
              name="isImportant"
              id="isImportant"
              label="Is Important?"
              value={newNote.important}
              onChange={handleNewNoteChange}
            ></FormInput>
          </div>
          <div>
            <Button text={"Create Note"}></Button>
          </div>
        </form>
        <Footer></Footer>
      </div>
    );
  }
};

export default App;
