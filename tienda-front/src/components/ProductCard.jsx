function ProductCard({ nombre, precio, imagen }) {

return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col">
        <img src={imagen} alt={nombre} className="w-full h-40 object-contain p-4 bg-gray-50" />

        <div className="p-4 flex flex-col flex-1">
            <h3 className="font-semibold text-gray-800 flex-1">{nombre}</h3>
            <p className="text-lg font-bold text-blue-600 mt-2">${precio}</p>

            <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Agregar al carrito
            </button>
        </div>
    </div>
);
}

export default ProductCard;