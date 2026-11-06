import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/notes`,
});

// GET ALL NOTES
export const getNotes = async () => {
  const response = await API.get("/");
  return response.data;
};

// CREATE NOTE
export const createNote = async (noteData) => {
  const response = await API.post("/", noteData);
  return response.data;
};

// UPDATE NOTE
export const updateNote = async (id, noteData) => {
  const response = await API.put(`/${id}`, noteData);
  return response.data;
};

// DELETE NOTE
export const deleteNote = async (id) => {
  const response = await API.delete(`/${id}`);
  return response.data;
};