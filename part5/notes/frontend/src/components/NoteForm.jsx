import { useState } from "react";
import PropTypes from "prop-types";
const NoteForm = ({ addNote }) => {
  const [newNote, setNewNote] = useState("");

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const createNote = async (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: true,
    };
    try {
      await addNote(noteObject);
    } catch (error) {
      console.log(error);
    } finally {
      setNewNote("");
    }
  };

  NoteForm.propTypes = {
    addNote: PropTypes.func.isRequired,
  };

  return (
    <div className="formDiv">
      <h3>Create a new Note</h3>
      <form onSubmit={createNote}>
        <input value={newNote} onChange={handleNoteChange} required />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default NoteForm;
