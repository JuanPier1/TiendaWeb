import { useCarrito } from '../context/CarritoContext.jsx';

function ProductCard({ id, nombre, precio, imagen, stock }) {
    const { agregarProducto } = useCarrito();

return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col">
        {/*<img src={imagen} alt={nombre} className="w-full h-40 object-contain p-4 bg-gray-50" />*/}
        {imagen ? (
        <img src={imagen} alt={nombre} className="w-full h-40 object-contain p-4 bg-gray-50" />
        ) : (
            <div className="w-full h-40 bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
            Sin imagen
            </div>
        )}


        <div className="p-4 flex flex-col flex-1">
            <h3 className="font-semibold text-gray-800 flex-1">{nombre}</h3>
            <p className="text-lg font-bold text-blue-600 mt-2">${precio}</p>
            {stock === 0 && <p className="text-xs text-red-500 mt-1">Sin stock</p>}

            <button 
                onClick={() => agregarProducto({ id, nombre, precio, imagen })}
                className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={stock === 0}
            >
                {stock === 0 ? 'Agotado' : 'Agregar al carrito'}
            </button>
        </div>
    </div>
);
}

export default ProductCard;