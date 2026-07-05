import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext.jsx';

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [errores, setErrores] = useState({});
    const [errorApi, setErrorApi] = useState('');
    const [cargando, setCargando] = useState(false);
    const { iniciarSesion } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const validar = () => {
        const nuevosErrores = {};

        const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correoRegex.test(email)) {
            nuevosErrores.email = 'Correo electrónico inválido';
        }

        if (pass.length === 0) {
            nuevosErrores.pass = 'La contraseña es obligatoria';
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log({ email, pass });
        setErrorApi('');

        if (!validar()) return;
        setCargando(true);

        try {
            const { usuario, token } = await login(email, pass);
            iniciarSesion(usuario, token);
            //navigate('/');
            const destino = location.state?.from?.pathname || '/';
            navigate(destino, { replace: true });
        } catch (err) {
            setErrorApi(err.response?.data?.error || 'Error al iniciar sesión');
            //console.error('Error completo:', err);
        } finally {
            setCargando(false);
        }
    };

return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
        <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm space-y-5"
        >
        <h1 className="text-2xl font-bold text-gray-800 text-center">Iniciar sesión</h1>

        {errorApi && (
            <p className="bg-red-50 text-red-600 text-sm rounded-lg px-3 py-2">{errorApi}</p>
        )}

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
            </label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                    errores.email ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                placeholder="tucorreo@ejemplo.com"
                //required
            />
            {errores.email && <p className="text-red-600 text-xs mt-1">{errores.email}</p>}
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
            </label>
            <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                    errores.clave ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                    }`}
            placeholder="••••••••"
                //required
            />
            {errores.clave && <p className="text-red-600 text-xs mt-1">{errores.clave}</p>}
        </div>

        <button
            type="submit"
            disabled={cargando}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
            {cargando ? 'Entrando...' : 'Entrar'}
        </button>

        <p className="text-sm text-gray-600 text-center">
            ¿No tienes cuenta?{' '}
            <Link to="/registro" className="text-blue-600 hover:underline">
                Regístrate
            </Link>
        </p>
        </form>
    </div>
);
}

export default Login;