import ProductCard from '../components/ProductCard.jsx';
import {nintendo, laptop, play} from '../assets/demo/demobarrel.js';
import BusquedaAvanzada from '../components/BusquedaAvanzada.jsx';

// Datos de ejemplo
const productosDemo = [
    { id: 1, nombre: 'Nintendo Switch', precio: 6999, imagen: nintendo },
    { id: 2, nombre: 'PlayStation 5', precio: 12999, imagen: play },
    { id: 3, nombre: 'Laptop', precio: 11999, imagen: laptop },
];

function ListaCompras() {
return (
    <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Lista de compras</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productosDemo.map((producto) => (
                <ProductCard key={producto.id} {...producto} />
            ))}
        </div>
    </div>
);
}

export default ListaCompras;