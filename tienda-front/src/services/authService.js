import { api } from './api.js';

export const login = async (correo, clave) => {
    const { data } = await api.post('/login', { correo, clave });
    return data; // { usuario, token }
};

export const registro = async (nombre, apellidos, correo, clave) => {
    const { data } = await api.post('/registro', { nombre, apellidos, correo, clave });
    return data; // usuario creado (sin clave)
};