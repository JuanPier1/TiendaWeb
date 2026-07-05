import { api } from './api.js';

export const obtenerProductos = async () => {
    const { data } = await api.get('/productos');
    return data;
};