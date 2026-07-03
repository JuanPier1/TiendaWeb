import { useState } from 'react';

function BusquedaAvanzada({ onBuscar }) {
    const [filtros, setFiltros] = useState({
        nombre: '',
        categoria: 'todas',
        precioMax: 20000,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltros((f) => ({ ...f, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onBuscar?.(filtros); // se lo pasa al padre, que decide qué hacer con la búsqueda
    };

return (
    <form
    onSubmit={handleSubmit}
    className="bg-white shadow-sm rounded-xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
    >
    <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Producto</label>
        <input
        type="text"
        name="nombre"
        value={filtros.nombre}
        onChange={handleChange}
        placeholder="Buscar por nombre..."
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>

    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
        <select
        name="categoria"
        value={filtros.categoria}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
        <option value="todas">Todas</option>
        <option value="consolas">Consolas</option>
        <option value="juegos">Juegos</option>
        <option value="accesorios">Accesorios</option>
        </select>
    </div>

    <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
        Precio máx: ${filtros.precioMax}
        </label>
        <input
        type="range"
        name="precioMax"
        min={0}
        max={20000}
        step={500}
        value={filtros.precioMax}
        onChange={handleChange}
        className="w-full accent-blue-600"
        />
    </div>

    <button
        type="submit"
        className="md:col-span-4 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
    >
        Buscar
    </button>
    </form>
);
}

export default BusquedaAvanzada;