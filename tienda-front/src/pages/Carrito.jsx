import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext.jsx';
import { useState } from 'react';

function Carrito() {
    const { items, cambiarCantidad, quitarProducto, total, vaciarCarrito } = useCarrito();
    const [comprando, setComprando] = useState(false);
    const [confirmado, setConfirmado] = useState(false);
    const navigate = useNavigate();

    const handleConfirmarCompra = () => {
        setComprando(true);

        // Simulación por ahora — aquí luego iría la llamada real al backend
        setTimeout(() => {
        setComprando(false);
        setConfirmado(true);
        vaciarCarrito();
        }, 1000);
    };

    if (confirmado) {
        return (
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
            <div className="text-5xl mb-4">✅</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">¡Compra confirmada!</h1>
            <p className="text-gray-600 mb-6">Gracias por tu compra. Pronto recibirás más detalles.</p>
            <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
            Volver a la tienda
            </Link>
        </div>
        );
    }

    if (items.length === 0) {
        return (
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
            <div className="text-5xl mb-4">🛒</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Tu carrito está vacío</h1>
            <p className="text-gray-600 mb-6">Agrega productos desde la tienda para verlos aquí.</p>
            <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
            Ir a la tienda
            </Link>
        </div>
        );
    }

return (
    <div className="max-w-3xl mx-auto px-4 py-10">
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Tu carrito</h1>

    <div className="bg-white rounded-xl shadow-md divide-y divide-gray-100 mb-6">
        {items.map((item) => (
        <div key={item.id} className="flex items-center gap-4 p-4">
            {item.imagen ? (
            <img
                src={item.imagen}
                alt={item.nombre}
                className="w-16 h-16 object-contain bg-gray-50 rounded-lg"
            />
            ) : (
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs">
                Sin imagen
            </div>
            )}

            <div className="flex-1">
            <p className="font-medium text-gray-800">{item.nombre}</p>
            <p className="text-sm text-gray-500">${item.precio} c/u</p>
            </div>

            <div className="flex items-center gap-2">
            <button
                onClick={() => cambiarCantidad(item.id, item.cantidad - 1)}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
            >
                −
            </button>
            <span className="w-6 text-center text-sm">{item.cantidad}</span>
            <button
                onClick={() => cambiarCantidad(item.id, item.cantidad + 1)}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600"
            >
                +
            </button>
            </div>

            <p className="w-20 text-right font-semibold text-gray-800">
            ${(item.precio * item.cantidad).toFixed(2)}
            </p>

            <button
            onClick={() => quitarProducto(item.id)}
            className="text-red-500 hover:text-red-700 text-sm ml-2"
            title="Quitar producto"
            >
            ✕
            </button>
        </div>
        ))}
    </div>

    <div className="bg-white rounded-xl shadow-md p-6 flex items-center justify-between">
        <div>
        <p className="text-sm text-gray-500">Total</p>
        <p className="text-2xl font-bold text-gray-800">${total.toFixed(2)}</p>
        </div>

        <button
        onClick={handleConfirmarCompra}
        disabled={comprando}
        className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
        {comprando ? 'Procesando...' : 'Confirmar compra'}
        </button>
    </div>
    </div>
);
}

export default Carrito;