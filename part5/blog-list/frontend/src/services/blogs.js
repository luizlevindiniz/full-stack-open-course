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

export default { getAll, setToken, create };
