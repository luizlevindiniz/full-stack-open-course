import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

function findPersonByName(arr, name) {
  return arr.find(
    (p) =>
      p.name.replace(/\s/g, "").toLowerCase() ===
      name.replace(/\s/g, "").toLowerCase()
  );
}
function findPersonByID(arr, id) {
  return arr.find((p) => p.id === id);
}

async function createPerson(payload) {
  const res = await axios.post(baseUrl, payload, { responseType: "json" });
  if (res.status >= 200 && res.status < 300) return res.data;
}

async function updatePerson(id, payload) {
  const res = await axios.put(`${baseUrl}/${id}/`, payload, {
    responseType: "json",
  });
  if (res.status >= 200 && res.status < 300) return res.data;
}

async function getAllPersons() {
  const res = await axios.get(baseUrl, { responseType: "json" });
  if (res.status >= 200 && res.status < 300) return res.data;
}

async function deletePerson(id) {
  const res = await axios.delete(`${baseUrl}/${id}/`, { responseType: "json" });
  if (res.status >= 200 && res.status < 300) return res.data;
}

export {
  findPersonByName,
  createPerson,
  getAllPersons,
  deletePerson,
  findPersonByID,
  updatePerson,
};
