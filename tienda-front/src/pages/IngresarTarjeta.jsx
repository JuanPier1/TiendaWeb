import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { crearTarjeta } from '../services/cardService.js';


function IngresarTarjeta() {
    const [form, setForm] = useState({
        numero: '',
        titular: '',
        vencimiento: '',
        cvv: '',
    });

    const [errores, setErrores] = useState({});
    const [errorApi, setErrorApi] = useState('');
    const [cargando, setCargando] = useState(false);
    const navigate = useNavigate();



    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validarTarjeta = () => {
        const nuevosErrores = {};

        const numeroLimpio = form.numero.replace(/\s/g, '');
        
        if (!/^\d{16}$/.test(numeroLimpio)) {
            nuevosErrores.numero = 'Debe tener 16 dígitos';
        }

        if (form.titular.trim().length < 3) {
            nuevosErrores.titular = 'Nombre inválido';
        }

        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.vencimiento)) {
            nuevosErrores.vencimiento = 'Formato MM/AA';
        } else {
            const [mes, anio] = form.vencimiento.split('/').map(Number);
            const ahora = new Date();
            const anioActual = ahora.getFullYear() % 100;
            const mesActual = ahora.getMonth() + 1;
        if (anio < anioActual || (anio === anioActual && mes < mesActual)) {
            nuevosErrores.vencimiento = 'La tarjeta está vencida';
        }
        }

        if (!/^\d{3,4}$/.test(form.cvv)) {
            nuevosErrores.cvv = 'CVV inválido';
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log(form);
        setErrorApi('');

        if (!validarTarjeta()) return;
        setCargando(true);

        try {
            //console.log(form);
            const numeroLimpio = form.numero.replace(/\s/g, '');
            await crearTarjeta({
                numero: numeroLimpio,
                titular: form.titular,
                vencimiento: form.vencimiento,
                cvv: form.cvv,
            });
            navigate('/tarjetas');
        } catch(err) {
            setErrorApi(err.response?.data?.error || 'Error al guardar la tarjeta');
        } finally {
            setCargando(false);
        }
    };

return (
    <div className="max-w-md mx-auto px-4 py-10">
    <h1 className="text-2xl font-bold text-gray-800 mb-6">Agregar tarjeta</h1>

    <form onSubmit={handleSubmit} noValidate className="bg-white shadow-md rounded-xl p-8 space-y-5">
        {errorApi && (
            <p className="bg-red-50 text-red-600 text-sm rounded-lg px-3 py-2">{errorApi}</p>
        )}
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
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 
                    ${errores.numero ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                    }`} 
                //required
            />
            {errores.numero && <p className="text-red-600 text-xs mt-1">{errores.numero}</p>}
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Titular</label>
            <input
                type="text"
                name="titular"
                value={form.titular}
                onChange={handleChange}
                placeholder="Nombre como aparece en la tarjeta"
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                    errores.titular ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                //required
            />
            {errores.titular && <p className="text-red-600 text-xs mt-1">{errores.titular}</p>}
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
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                    errores.vencimiento ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                //required
                />
                {errores.vencimiento && (
                    <p className="text-red-600 text-xs mt-1">{errores.vencimiento}</p>
                )}
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
                className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                    errores.cvv ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'
                    }`}
                //required
                />
                {errores.cvv && <p className="text-red-600 text-xs mt-1">{errores.cvv}</p>}
            </div>
        </div>

        <button
            type="submit"
            disabled={cargando}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
            {cargando ? 'Guardando...' : 'Guardar tarjeta'}
        </button>
    </form>
    </div>
);
}

export default IngresarTarjeta;