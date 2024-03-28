import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import Anecdote from "./Anecdote";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state); // store
  const dispatch = useDispatch(); // store dispatcher

  const byVotes = (a, b) => b.votes - a.votes;
  const handleVotes = (id) => {
    dispatch(vote(id));
  };

  return (
    <div>
      {anecdotes.sort(byVotes).map((anecdote) => (
        <Anecdote key={anecdote.id} onClick={handleVotes} anecdote={anecdote} />
      ))}
    </div>
  );
};

export default AnecdoteList;
