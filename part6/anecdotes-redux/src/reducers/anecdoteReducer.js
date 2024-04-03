import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (content) => {
  return {
    content: content,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: initialState,
  reducers: {
    create(state, action) {
      const newAnecdote = asObject(action.payload);

      state.push(newAnecdote);
    },
    vote(state, action) {
      const id = action.payload;

      const anecdoteToChange = state.find((anec) => anec.id === id);
      if (anecdoteToChange) {
        const anecdoteChanged = {
          ...anecdoteToChange,
          votes: anecdoteToChange.votes + 1,
        };

        return state.map((anec) => (anec.id === id ? anecdoteChanged : anec));
      }
      return state;
    },
  },
});

export default anecdoteSlice.reducer;
export const { create, vote } = anecdoteSlice.actions;
