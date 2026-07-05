import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { actualizarUsuario } from '../services/userService.js';

function Perfil() {
    const { usuario, actualizarUsuarioContext } = useAuth();

    const [form, setForm] = useState({
        nombre: usuario?.nombre || '',
        apellidos: usuario?.apellidos || '',
        correo: usuario?.correo || '',
        telefono: usuario?.telefono || '',
        direccion: usuario?.direccion || '',
    });

    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [cargando, setCargando] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje('');
        setError('');
        setCargando(true);

        try {
            const usuarioActualizado = await actualizarUsuario(usuario.id, form);
            actualizarUsuarioContext(usuarioActualizado);
            setMensaje('Cambios guardados correctamente');
        } catch (err) {
            setError(err.response?.data?.error || 'Error al guardar los cambios');
        } finally {
            setCargando(false);
        }
    };

return (
    <div className="max-w-2xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Mi perfil</h1>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-8 space-y-5">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
                    {form.nombre.charAt(0).toUpperCase()}
                </div>
                <div>
                    <p className="font-semibold text-gray-800">
                    {form.nombre} {form.apellidos}
                    </p>
                    <p className="text-sm text-gray-500">{form.correo}</p>
                </div>
                </div>

                {mensaje && (
                <p className="bg-green-50 text-green-600 text-sm rounded-lg px-3 py-2">{mensaje}</p>
                )}
                {error && (
                <p className="bg-red-50 text-red-600 text-sm rounded-lg px-3 py-2">{error}</p>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                        <input
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                    <input
                    type="text"
                    name="apellidos"
                    value={form.apellidos}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Correo</label>
                    <input
                    type="email"
                    name="correo"
                    value={form.correo}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input
                    type="tel"
                    name="telefono"
                    value={form.telefono}
                    onChange={handleChange}
                    placeholder="Opcional"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                    <input
                    type="text"
                    name="direccion"
                    value={form.direccion}
                    onChange={handleChange}
                    placeholder="Opcional"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <button
            type="submit"
            disabled={cargando}
            className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
            {cargando ? 'Guardando...' : 'Guardar cambios'}
            </button>
        </form>
    </div>
);
}

export default Perfil;