import axios from 'axios';

const API_URL = 'http://localhost:3000/promociones'; // Asegúrate de que esta URL sea correcta

// Obtener todos los códigos promocionales
export const obtenerCodigosPromocionales = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Crear un nuevo código promocional
export const crearCodigoPromocional = async (codigoPromocional) => {
  const response = await axios.post(API_URL, codigoPromocional);
  return response.data;
};

// Actualizar un código promocional existente
export const actualizarCodigoPromocional = async (id, codigoPromocional) => {
  const response = await axios.put(`${API_URL}/${id}`, codigoPromocional);
  return response.data;
};

// Eliminar un código promocional
export const eliminarCodigoPromocional = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
