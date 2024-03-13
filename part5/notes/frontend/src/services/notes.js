import axios from "axios";
const baseUrl = "/api/notes";

let token = null;
const setToken = (tokenToSet) => {
  token = `Bearer ${tokenToSet}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl, {
    headers: { Authorization: token },
  });
  return res.data;
};

const create = async (newObject) => {
  const res = await axios.post(baseUrl, newObject, {
    headers: { Authorization: token },
  });
  return res.data;
};

const update = async (id, newObject) => {
  const res = await axios.put(`${baseUrl}/${id}`, newObject, {
    headers: { Authorization: token },
  });
  return res.data;
};

export default {
  getAll,
  create,
  update,
  setToken,
};
