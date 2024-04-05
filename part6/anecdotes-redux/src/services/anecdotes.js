import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createAnecdote = async (payload) => {
  const response = await axios.post(baseUrl, payload);
  return response.data;
};

const voteForAnecdote = async (anecdote) => {
  const voteUrl = `${baseUrl}/${anecdote.id}`;

  const anecdoteToChange = {
    ...anecdote,
    votes: anecdote.votes + 1,
  };

  const response = await axios.put(voteUrl, anecdoteToChange);
  return response.data;
};

export default { getAll, createAnecdote, voteForAnecdote };
