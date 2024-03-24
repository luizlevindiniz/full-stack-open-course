import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (tokenToSet) => {
  token = tokenToSet;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const create = async (blogObject) => {
  const res = await axios.post(baseUrl, blogObject, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const update = async (blogObject, id) => {
  const res = await axios.put(`${baseUrl}/${id}`, blogObject, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const del = async (id) => {
  const res = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.status;
};

export default { getAll, setToken, create, update, del };
