import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);
    const [token, setToken] = useState(null);
    const [cargando, setCargando] = useState(true);

    // Revisa si ya había una sesión guardada
    useEffect(() => {
        const tokenGuardado = localStorage.getItem('token');
        const usuarioGuardado = localStorage.getItem('usuario');

    if (tokenGuardado && usuarioGuardado) {
        try {
            setToken(tokenGuardado);
            setUsuario(JSON.parse(usuarioGuardado));
        } catch {
            // limpia todo en caso de corrupción
            localStorage.removeItem('token');
            localStorage.removeItem('usuario');
        }
    }

    setCargando(false);
    }, []);

    const iniciarSesion = (usuarioData, tokenData) => {
        localStorage.setItem('token', tokenData);
        localStorage.setItem('usuario', JSON.stringify(usuarioData));
        setToken(tokenData);
        setUsuario(usuarioData);
    };

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        setToken(null);
        setUsuario(null);
    };

    const estaAutenticado = Boolean(token);

    const actualizarUsuarioContext = (usuarioNuevo) => {
        localStorage.setItem('usuario', JSON.stringify(usuarioNuevo));
        setUsuario(usuarioNuevo);
    };

return (
    <AuthContext.Provider
        value={{ usuario, token, estaAutenticado, cargando, iniciarSesion, cerrarSesion, actualizarUsuarioContext }}
    >
    {children}
    </AuthContext.Provider>
);
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
    return context;
}