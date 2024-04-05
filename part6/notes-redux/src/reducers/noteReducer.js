import { createSlice } from "@reduxjs/toolkit";
import noteService from "../services/notes";

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    createNote(state, action) {
      const payload = action.payload;
      state.push(payload);
    },
    toggleImportanceOf(state, action) {
      const changedNote = action.payload;
      const idToLookFor = changedNote.id;

      const noteToChange = state.find((n) => n.id === idToLookFor);
      if (noteToChange) {
        return state.map((note) =>
          note.id !== idToLookFor ? note : changedNote
        );
      }
      return state;
    },
    appendNote(state, action) {
      state.push(action.payload);
    },
    setNotes(state, action) {
      return action.payload;
    },
  },
});

export const { createNote, toggleImportanceOf, appendNote, setNotes } =
  noteSlice.actions;

export const initializeNotes = () => {
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch(setNotes(notes));
  };
};

export const createNewNote = (content, important) => {
  return async (dispatch) => {
    const newNote = await noteService.createNote(content, important);
    dispatch(appendNote(newNote));
  };
};

export default noteSlice.reducer;
