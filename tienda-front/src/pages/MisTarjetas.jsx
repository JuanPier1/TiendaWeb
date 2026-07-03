import Carousel from '../components/Carousel.jsx';

// Reemplazar estas rutas por tus imágenes reales en src/assets/images
const tarjetas = [
    { id: 1, banco: 'BBVA', color: 'from-blue-600 to-blue-800' },
    { id: 2, banco: 'Banorte', color: 'from-red-600 to-red-800' },
    { id: 3, banco: 'Citibanamex', color: 'from-sky-600 to-sky-800' },
    { id: 4, banco: 'Afirme', color: 'from-emerald-600 to-emerald-800' },
];

function MisTarjetas() {
return (
    <div className="max-w-2xl mx-auto px-4 py-10">
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Mis tarjetas</h1>

    <Carousel
        items={tarjetas}
        renderItem={(tarjeta) => (
        <div
            className={`bg-gradient-to-br ${tarjeta.color} rounded-xl p-6 h-48 flex flex-col justify-between text-white shadow-lg mx-2`}
        >
            <div className="flex justify-between items-start">
            <span className="font-semibold text-lg">{tarjeta.banco}</span>
            <span className="text-sm opacity-80">•••• 4242</span>
            </div>
            <div>
            <p className="text-xs opacity-70">Titular</p>
            <p className="font-medium tracking-wide">JUAN PEREZ</p>
            </div>
        </div>
        )}
    />

    <button className="mt-8 w-full max-w-md mx-auto block bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors">
        + Agregar tarjeta
    </button>
    </div>
);
}

export default MisTarjetas;