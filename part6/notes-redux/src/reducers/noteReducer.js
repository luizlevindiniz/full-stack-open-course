import { createSlice } from "@reduxjs/toolkit";

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
export default noteSlice.reducer;
