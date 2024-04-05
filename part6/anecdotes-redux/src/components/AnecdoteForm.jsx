import { useDispatch } from "react-redux";
import { createNewAnecdote } from "../reducers/anecdoteReducer";
import { raiseNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch(); // store dispatcher

  const handleCreate = async (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";

    const anecdoteToCreate = {
      content: content,
      votes: 0,
    };

    dispatch(createNewAnecdote(anecdoteToCreate));
    dispatch(raiseNotification("new anecdote created!", 3));
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
