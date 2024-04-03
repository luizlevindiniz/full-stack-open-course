import axios from "axios";

const baseUrl = "http://localhost:3001/notes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNote = async (content, important) => {
  const payload = {
    content: content,
    important: important,
  };
  const response = await axios.post(baseUrl, payload);
  return response.data;
};

const toggleNote = async (note) => {
  const url = `${baseUrl}/${note.id}`;

  const payload = {
    ...note,
    important: !note.important,
  };
  const response = await axios.put(url, payload);
  return response.data;
};

export default { getAll, createNote, toggleNote };
