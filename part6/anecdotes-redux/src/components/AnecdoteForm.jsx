import { useDispatch } from "react-redux";
import { create } from "../reducers/anecdoteReducer";
import {
  setNotification,
  eraseNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch(); // store dispatcher

  const handleCreate = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";
    dispatch(create(content));
    dispatch(setNotification("blog created!"));
    setTimeout(() => {
      dispatch(eraseNotification());
    }, 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label htmlFor="content"></label>
          <input type="text" name="content" id="content" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
