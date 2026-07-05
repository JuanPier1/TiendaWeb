function ConfirmModal({ abierto, titulo, mensaje, onConfirmar, onCancelar, cargando }) {
    if (!abierto) return null;

return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
    <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2">{titulo}</h2>
        <p className="text-sm text-gray-600 mb-6">{mensaje}</p>

        <div className="flex justify-end gap-3">
        <button
            onClick={onCancelar}
            disabled={cargando}
            className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
            Cancelar
        </button>
        <button
            onClick={onConfirmar}
            disabled={cargando}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
        >
            {cargando ? 'Eliminando...' : 'Eliminar'}
        </button>
        </div>
    </div>
    </div>
);
}

export default ConfirmModal;