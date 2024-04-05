import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAllAnecdotes = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const createNewAnecdote = (payload) => {
  return axios.post(baseUrl, payload).then((res) => res.data);
};

const updateAnecdote = (anecdoteToUpdate) => {
  return axios
    .put(`${baseUrl}/${anecdoteToUpdate.id}`, anecdoteToUpdate)
    .then((res) => res.data);
};

export { getAllAnecdotes, createNewAnecdote, updateAnecdote };
