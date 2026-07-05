import { createContext, useContext, useState } from 'react';

const CarritoContext = createContext(null);

export function CarritoProvider({ children }) {
    const [items, setItems] = useState([]);

    const agregarProducto = (producto) => {
        setItems((prev) => {
            const existe = prev.find((p) => p.id === producto.id);
            if (existe) {
                return prev.map((p) =>
                p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p);
            }
            return [...prev, { ...producto, cantidad: 1 }];
        });
    };

    const quitarProducto = (id) => {
        setItems((prev) => prev.filter((p) => p.id !== id));
    };

    const cambiarCantidad = (id, cantidad) => {
        if (cantidad < 1) return;
        setItems((prev) =>
        prev.map((p) => (p.id === id ? { ...p, cantidad } : p)));
    };

    const vaciarCarrito = () => setItems([]);

    const total = items.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
    const totalItems = items.reduce((sum, p) => sum + p.cantidad, 0);

    return (
        <CarritoContext.Provider
            value={{ items, agregarProducto, quitarProducto, cambiarCantidad, vaciarCarrito, total, totalItems }}
        >
        {children}
        </CarritoContext.Provider>
    );
}

export function useCarrito() {
    const context = useContext(CarritoContext);
    if (!context) throw new Error('useCarrito debe usarse dentro de CarritoProvider');
    return context;
}