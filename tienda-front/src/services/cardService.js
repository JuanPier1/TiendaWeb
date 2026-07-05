import { api } from './api.js';

export const obtenerTarjetas = async () => {
    const { data } = await api.get('/tarjetas');
    return data;
};

export const crearTarjeta = async (tarjeta) => {
    const { data } = await api.post('/tarjetas', tarjeta);
    return data;
};

export const eliminarTarjeta = async (id) => {
    const { data } = await api.delete(`/tarjetas/${id}`);
    return data;
};