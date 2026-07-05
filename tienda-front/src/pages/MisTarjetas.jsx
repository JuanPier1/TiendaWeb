import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obtenerTarjetas, eliminarTarjeta } from '../services/cardService.js';
import { detectarTipoTarjeta, obtenerColorTarjeta } from '../utils/cardHelpers.js';
import Carousel from '../components/Carousel.jsx';
import ConfirmModal from '../components/ConfirmModal.jsx';

function MisTarjetas() {
    const [tarjetas, setTarjetas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [tarjetaAEliminar, setTarjetaAEliminar] = useState(null);
    const [eliminando, setEliminando] = useState(false);

    useEffect(() => {
        cargarTarjetas();
    }, []);

    const cargarTarjetas = async () => {
        try {
            const data = await obtenerTarjetas();
            setTarjetas(data);
        } catch (err) {
            setError('No se pudieron cargar las tarjetas');
        } finally {
            setCargando(false);
        }
    };

    const confirmarEliminar = async () => {
        if (!tarjetaAEliminar) return;

        setEliminando(true);
        try {
            await eliminarTarjeta(tarjetaAEliminar.id);
            setTarjetas((prev) => prev.filter((t) => t.id !== tarjetaAEliminar.id));
            setTarjetaAEliminar(null);
        } catch (err) {
            setError('No se pudo eliminar la tarjeta');
            console.error('Error al eliminar:', err);
        } finally {
            setEliminando(false);
        }
    };

    if (cargando) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-10 text-center text-gray-500">
                Cargando tarjetas...
            </div>
        );
    }

return (
    <div className="max-w-2xl mx-auto px-4 py-10">
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Mis tarjetas</h1>

    {error && (
        <p className="bg-red-50 text-red-600 text-sm rounded-lg px-3 py-2 mb-4">{error}</p>
    )}

    {tarjetas.length === 0 ? (
        <p className="text-center text-gray-500 py-10">Aún no tienes tarjetas guardadas.</p>
    ) : (
        <Carousel
        items={tarjetas}
        renderItem={(tarjeta) => (
            <div className="mx-2 space-y-2">
            <div
                className={`bg-gradient-to-br ${obtenerColorTarjeta(tarjeta.numero)} rounded-xl p-6 h-48 flex flex-col justify-between text-white shadow-lg`}
            >
                <div className="flex justify-between items-start">
                <span className="font-semibold text-lg">
                    {detectarTipoTarjeta(tarjeta.numero)}
                </span>
                <span className="text-sm opacity-80">
                    •••• {tarjeta.numero?.slice(-4)}
                </span>
                </div>

                <div>
                <p className="text-xs opacity-70">Titular</p>
                <p className="font-medium tracking-wide">{tarjeta.titular}</p>
                </div>
            </div>

            <button
                onClick={() => setTarjetaAEliminar(tarjeta)}
                className="text-xs font-medium text-red-600 hover:text-red-700 hover:underline"
            >
                Eliminar
            </button>
            </div>
        )}
        />
    )}

    <Link
        to="/tarjetas/agregar"
        className="mt-8 w-full max-w-md mx-auto block text-center bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
    >
        + Agregar tarjeta
    </Link>

    <ConfirmModal
        abierto={Boolean(tarjetaAEliminar)}
        titulo="Eliminar tarjeta"
        mensaje={`¿Seguro que quieres eliminar la tarjeta terminada en ${tarjetaAEliminar?.numero?.slice(-4)}?`}
        onConfirmar={confirmarEliminar}
        onCancelar={() => setTarjetaAEliminar(null)}
        cargando={eliminando}
    />
    </div>
);
}

export default MisTarjetas;