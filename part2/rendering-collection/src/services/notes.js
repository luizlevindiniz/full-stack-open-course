import axios from "axios";
const baseUrl = "http://localhost:3001/notes";

async function createNote(newNote) {
  const res = await axios.post(baseUrl, newNote, {
    responseType: "json",
  });

  if (res.status >= 200 && res.status < 300) return res.data;
}

async function updateNote(changedNote) {
  const id = changedNote.id;
  const res = await axios.put(`${baseUrl}/${id}/`, changedNote, {
    responseType: "json",
  });
  if (res.status >= 200 && res.status < 300) return res.data;
}

async function getAllNotes() {
  const res = await axios.get(baseUrl, {
    responseType: "json",
  });
  if (res.status >= 200 && res.status < 300) return res.data;
}
async function deleteNote(noteID) {
  const res = await axios.delete(`${baseUrl}/${noteID}/`, {
    responseType: "json",
  });
  if (res.status >= 200 && res.status < 300) return res.data;
}

export { getAllNotes, createNote, updateNote, deleteNote };
