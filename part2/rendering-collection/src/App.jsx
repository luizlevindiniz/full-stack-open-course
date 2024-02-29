import { useState } from "react";
import Note from "./components/Note";
import Button from "./components/Button";
import FormInput from "./components/FormInput";

const App = ({ notes }) => {
  const [notesList, setNotesList] = useState(notes);
  const [newNote, setNewNote] = useState({ content: "", important: false });
  const [showJustImportant, setShowJustImportant] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const noteToAdd = { ...newNote, id: notesList.length + 1 };
    setNotesList(notesList.concat(noteToAdd));
    setNewNote({ content: "", important: newNote.important });
  };

  const handleNewNoteChange = (event) => {
    if (event.target.id === "isImportant") {
      setNewNote({ ...newNote, important: event.target.checked });
    } else {
      setNewNote({ ...newNote, content: event.target.value });
    }
  };

  const notesToShow = showJustImportant
    ? notesList.filter((note) => note.important)
    : notesList;

  return (
    <div>
      <h1>Notes</h1>
      <label htmlFor="showImportant">Show Just Important</label>
      <input
        type="checkbox"
        name="showImportant"
        id="showImportant"
        onClick={() => setShowJustImportant(!showJustImportant)}
      />
      <ul>
        {notesToShow.map((note) => {
          return <Note key={note.id} note={note}></Note>;
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
    </div>
  );
};

export default App;
