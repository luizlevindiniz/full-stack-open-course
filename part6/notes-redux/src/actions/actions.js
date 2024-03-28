const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const createNote = (important, content) => {
  const newNote = {
    id: generateId(),
    important: important,
    content: content,
  };

  const action = {
    payload: newNote,
    type: "NEW_NOTE",
  };
  return action;
};

const toggleImportanceOf = (note) => {
  const action = {
    type: "TOGGLE_IMPORTANCE",
    payload: note,
  };
  return action;
};

export { createNote, toggleImportanceOf };
