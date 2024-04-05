import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    create(state, action) {
      const newAnecdote = action.payload;

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
    initialize(state, action) {
      return action.payload;
    },
  },
});

export const { create, vote, initialize } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(initialize(anecdotes));
  };
};

export const createNewAnecdote = (payload) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createAnecdote(payload);
    dispatch(create(newAnecdote));
  };
};

export const voteFor = (anecdote) => {
  return async (dispatch) => {
    await anecdotesService.voteForAnecdote(anecdote);
    dispatch(vote(anecdote.id));
  };
};

export default anecdoteSlice.reducer;
