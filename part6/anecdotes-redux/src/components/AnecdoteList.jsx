import { useSelector, useDispatch } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import Anecdote from "./Anecdote";
import { createSelector } from "@reduxjs/toolkit";
import { raiseNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const byVotes = (a, b) => b.votes - a.votes;

  const sortedAnecdotes = createSelector(
    (state) => state.anecdotes,
    (state) => state.filter,
    (anecdotes, filter) => {
      return filter === ""
        ? [...anecdotes].sort(byVotes)
        : [...anecdotes]
            .filter((anecdote) => anecdote.content.includes(filter))
            .sort(byVotes);
    }
  );

  const anecdotes = useSelector((state) => {
    return sortedAnecdotes(state);
  }); // store
  const dispatch = useDispatch(); // store dispatcher

  const handleVotes = (anecdote) => {
    dispatch(voteFor(anecdote));
    dispatch(raiseNotification(`you voted '${anecdote.content}'`, 3));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <Anecdote key={anecdote.id} onClick={handleVotes} anecdote={anecdote} />
      ))}
    </div>
  );
};

export default AnecdoteList;
