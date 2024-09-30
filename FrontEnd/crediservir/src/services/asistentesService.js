import axios from 'axios';

const API_URL = 'http://localhost:3000/asistentes';

// Obtener todos los asistentes
export const getAsistentes = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Crear un nuevo asistente
export const createAsistente = async (asistente) => {
  const response = await axios.post(API_URL, asistente);
  return response.data;
};

// Actualizar un asistente existente
export const updateAsistente = async (id, asistente) => {
  const response = await axios.put(`${API_URL}/${id}`, asistente);
  return response.data;
};

// Eliminar un asistente
export const deleteAsistente = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
