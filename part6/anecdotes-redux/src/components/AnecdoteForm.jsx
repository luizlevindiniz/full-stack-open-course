import { useDispatch } from "react-redux";
import { create } from "../reducers/anecdoteReducer";
import { PropTypes } from "prop-types";

const AnecdoteForm = ({ setNotification }) => {
  const dispatch = useDispatch(); // store dispatcher

  const handleCreate = (event) => {
    event.preventDefault();
    const content = event.target.content.value;
    event.target.content.value = "";
    dispatch(create(content));
    setNotification("blog created!");
    setTimeout(() => {
      setNotification(null);
    }, 2000);
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

AnecdoteForm.propTypes = {
  setNotification: PropTypes.func,
};

export default AnecdoteForm;
