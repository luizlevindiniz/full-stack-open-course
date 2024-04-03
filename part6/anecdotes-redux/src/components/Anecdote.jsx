import PropTypes from "prop-types";

const Anecdote = ({ anecdote, onClick }) => {
  const { id, content, votes } = anecdote;
  return (
    <div>
      <div>{content}</div>
      <div>
        has {votes}
        <button onClick={() => onClick(id)}>vote</button>
      </div>
    </div>
  );
};

Anecdote.propTypes = {
  anecdote: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Anecdote;
