import { createNote } from "../actions/actions";
import { useDispatch } from "react-redux";

const NoteForm = () => {
  const dispatch = useDispatch();

  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";
    const important = event.target.important.checked;
    event.target.content.checked = false;

    dispatch(createNote(important, content));
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <label htmlFor="content">content: </label>
        <input type="text" name="content" id="content" />
        <label htmlFor="important">is important? </label>
        <input type="checkbox" name="important" id="important" />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default NoteForm;
