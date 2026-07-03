import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registro } from '../services/authService';

function Registro() {
    const [form, setForm] = useState({
        nombre: '',
        apellidos: '',
        email: '',
        pass: '',
        validPass: '',
    });
    const [errores, setErrores] = useState({});
    const [errorApi, setErrorApi] = useState('');
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();

    const handleChange = async (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validar = () => {
        const nuevosErrores = {};

        if (form.nombre.trim().length < 2) {
            nuevosErrores.nombre = 'El nombre debe tener al menos 2 caracteres';
        }

        if (form.apellidos.trim().length < 2) {
            nuevosErrores.apellidos = 'Los apellidos deben tener al menos 2 caracteres';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            nuevosErrores.email = 'Correo electrónico inválido';
        }

        if (form.pass.length < 8) {
            nuevosErrores.pass = 'La contraseña debe tener al menos 8 caracteres';
        } else if (!/[A-Z]/.test(form.pass) || !/[0-9]/.test(form.pass)) {
            nuevosErrores.pass = 'Debe incluir al menos una mayúscula y un número';
        }

        if (form.validPass !== form.pass) {
            nuevosErrores.validPass = 'Las contraseñas no coinciden';
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(form);
        setErrorApi('');

        if (!validar()) return;

        setCargando(true);
        try {
            await registro(form.nombre, form.apellidos, form.email, form.pass);
            navigate('/login');
        } catch (err) {
            setErrorApi(err.response?.data?.error || 'Error al registrar cuenta');
        } finally {
            setCargando(false);
        }
    };

return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-10">
        <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm space-y-5"
        >
        
        <h1 className="text-2xl font-bold text-gray-800 text-center">Crear cuenta</h1>

        {errorApi && (
            <p className="bg-red-50 text-red-600 text-sm rounded-lg px-3 py-2">{errorApi}</p>
        )}

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                </label>
                <input
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                        errores.nombre ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    placeholder="Tu nombre"
                    //required
                />
                {errores.nombre && <p className="text-red-600 text-xs mt-1">{errores.nombre}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apellidos
                </label>
                <input
                    type="text"
                    name="apellidos"
                    value={form.Apellidos}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                        errores.apellidos ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    placeholder='Tus Apellidos'
                />
                {errores.apellidos && <p className="text-red-600 text-xs mt-1">{errores.apellidos}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Correo electrónico
                </label>
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
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
                    name="pass"
                    value={form.pass}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                        errores.pass ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    placeholder="••••••••"
                    //required
                />
                {errores.pass && <p className="text-red-600 text-xs mt-1">{errores.pass}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirmar contraseña
                </label>
                <input
                    type="password"
                    name="validPass"
                    value={form.validPass}
                    onChange={handleChange}
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                        errores.validPass ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                    placeholder="••••••••"
                    //required
                />
                {errores.validPass && (
                    <p className="text-red-600 text-xs mt-1">{errores.validPass}</p>
                )}
            </div>

            <button
                type="submit"
                disabled={cargando}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
                {cargando ? 'Creando cuenta...' : 'Registrarme'}
            </button>

        <p className="text-sm text-gray-600 text-center">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
                Inicia sesión
            </Link>
        </p>
        </form>
    </div>
);
}

export default Registro;