import { useState } from 'react';

function IngresarTarjeta() {
    const [form, setForm] = useState({
        numero: '',
        titular: '',
        vencimiento: '',
        cvv: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    };

return (
    <div className="max-w-md mx-auto px-4 py-10">
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Agregar tarjeta</h1>

    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-8 space-y-5">
        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            Número de tarjeta
        </label>
        <input
            type="text"
            name="numero"
            value={form.numero}
            onChange={handleChange}
            placeholder="0000 0000 0000 0000"
            maxLength={19}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
        />
        </div>

        <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Titular</label>
        <input
            type="text"
            name="titular"
            value={form.titular}
            onChange={handleChange}
            placeholder="Nombre como aparece en la tarjeta"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
        />
        </div>

        <div className="grid grid-cols-2 gap-4">
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vencimiento</label>
            <input
            type="text"
            name="vencimiento"
            value={form.vencimiento}
            onChange={handleChange}
            placeholder="MM/AA"
            maxLength={5}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
            <input
            type="text"
            name="cvv"
            value={form.cvv}
            onChange={handleChange}
            placeholder="123"
            maxLength={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            />
        </div>
        </div>

        <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
        Guardar tarjeta
        </button>
    </form>
    </div>
);
}

export default IngresarTarjeta;