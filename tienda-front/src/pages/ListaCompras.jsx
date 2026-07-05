import { useState, useEffect } from 'react';
import { obtenerProductos } from '../services/productService.js';
import ProductCard from '../components/ProductCard.jsx';
import BusquedaAvanzada from '../components/BusquedaAvanzada.jsx';
//import {nintendo, laptop, play} from '../assets/demo/demobarrel.js';

// Datos de ejemplo * Solo Dev*
{/* 
const productosDemo = [
    { id: 1, nombre: 'Nintendo Switch', precio: 6999, imagen: nintendo },
    { id: 2, nombre: 'PlayStation 5', precio: 12999, imagen: play },
    { id: 3, nombre: 'Laptop', precio: 11999, imagen: laptop },
];
*/}

function ListaCompras() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [filtros, setFiltros] = useState({
        nombre: '',
        categoria: 'todas',
        precioMax: 20000,
    });

    useEffect(() => {
        const cargarProductos = async () => {
        try {
            const data = await obtenerProductos();
            setProductos(data);
        } catch (err) {
            setError('No se pudieron cargar los productos');
        } finally {
            setCargando(false);
        }
        };
        
        cargarProductos();
    }, []);

    const productosFiltrados = productos.filter((producto) => {
        const coincideNombre = producto.nombre
        .toLowerCase()
        .includes(filtros.nombre.toLowerCase());

        const coincideCategoria =
        filtros.categoria === 'todas' ||
        producto.categoria?.nombre.toLowerCase() === filtros.categoria.toLowerCase();

        const coincidePrecio = producto.precio <= filtros.precioMax;

        return coincideNombre && coincideCategoria && coincidePrecio;
    });

    if (cargando) {
        return (
            <div className="max-w-6xl mx-auto px-4 py-8 text-center text-gray-500">
                Cargando productos...
            </div>
        );
    }

return (
    <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Lista de compras</h1>

        {error && (
            <p className="bg-red-50 text-red-600 text-sm rounded-lg px-3 py-2 mb-4">{error}</p>
        )}

        <div className="mb-6">
            <BusquedaAvanzada onBuscar={setFiltros} />
        </div>

        {productosFiltrados.length === 0 ? (
            <p className="text-center text-gray-500 py-10">No hay productos disponibles.</p>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productosFiltrados.map((producto) => (
                    <ProductCard key={producto.id} {...producto} />
                ))}
            </div>
        )}

        {/* 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productosDemo.map((producto) => (
                <ProductCard key={producto.id} {...producto} />
            ))}
        </div>
        */}
    </div>
);
}

export default ListaCompras;