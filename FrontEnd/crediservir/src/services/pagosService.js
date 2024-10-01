import axios from 'axios';

// Función procesar compra
export const realizarPago = async (data) => {
    try {
        const response = await axios.post('http://localhost:3000/pagos', data);
        return response.data;
    } catch (error) {
        throw new Error('Error al procesar el pago: ' + error.message);
    }
};

// registrar inscripción
export const registrarInscripcion = async (data) => {
    try {
        const response = await axios.post('http://localhost:3000/inscripciones', data);
        return response.data;
    } catch (error) {
        throw new Error('Error al registrar la inscripción: ' + error.message);
    }
};
