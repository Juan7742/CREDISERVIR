import axios from 'axios';

// URL de la API de inscripciones
const API_URL = 'http://localhost:3000/inscripciones';

/**
 * Registrar una nueva inscripción
 * @param {Object} data - Los datos de la inscripción.
 * @returns {Promise<Object>} - La inscripción creada.
 */
export const registrarInscripcion = async (data) => {
    try {
        const response = await axios.post(API_URL, data);
        return response.data;
    } catch (error) {
        console.error('Error al registrar inscripción:', error);
        throw error;
    }
};

/**
 * Obtener todas las inscripciones
 * @returns {Promise<Array>} - La lista de inscripciones.
 */
export const getInscripciones = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error al obtener inscripciones:', error);
        throw error;
    }
};

/**
 * Obtener una inscripción por ID
 * @param {number} id - El ID de la inscripción.
 * @returns {Promise<Object>} - La inscripción encontrada.
 */
export const getInscripcionById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la inscripción:', error);
        throw error;
    }
};

/**
 * Actualizar una inscripción existente
 * @param {number} id - El ID de la inscripción a actualizar.
 * @param {Object} data - Los nuevos datos de la inscripción.
 * @returns {Promise<Object>} - La inscripción actualizada.
 */
export const updateInscripcion = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la inscripción:', error);
        throw error;
    }
};

/**
 * Eliminar una inscripción por ID
 * @param {number} id - El ID de la inscripción a eliminar.
 * @returns {Promise<void>}
 */
export const deleteInscripcion = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error al eliminar la inscripción:', error);
        throw error;
    }
};
