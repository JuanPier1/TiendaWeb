// Detecta la red de la tarjeta según el prefijo del número (rangos oficiales)
export function detectarTipoTarjeta(numero) {
    const limpio = (numero || '').replace(/\s/g, '');

    if (/^4/.test(limpio)) return 'Visa';
    if (/^(5[1-5]|2[2-7])/.test(limpio)) return 'Mastercard';
    if (/^3[47]/.test(limpio)) return 'American Express';
    if (/^6(?:011|5)/.test(limpio)) return 'Discover';

    return 'Desconocida';
}

const coloresTarjeta = {
    Visa: 'from-blue-600 to-blue-800',
    Mastercard: 'from-red-600 to-red-800',
    'American Express': 'from-sky-600 to-sky-800',
    Discover: 'from-emerald-600 to-emerald-800',
    Desconocida: 'from-gray-600 to-gray-800',
};

export function obtenerColorTarjeta(numero) {
    const tipo = detectarTipoTarjeta(numero);
    return coloresTarjeta[tipo];
}