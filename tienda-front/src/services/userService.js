import { api } from './api.js';

export const actualizarUsuario = async (id, datos) => {
    const { data } = await api.put(`/usuarios/${id}`, datos);
    return data;
};