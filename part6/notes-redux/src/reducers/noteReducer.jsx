const noteReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_NOTE":
      return state.concat(action.payload);
    case "TOGGLE_IMPORTANCE": {
      const id = action.payload.id;

      const noteToChange = state.find((note) => note.id === id);
      if (noteToChange) {
        const newNote = { ...noteToChange, important: !noteToChange.important };
        return state.map((note) => (note.id === id ? newNote : note));
      }
      return state;
    }
    default:
      return state;
  }
};

export default noteReducer;
