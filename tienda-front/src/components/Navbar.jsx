import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

function Navbar() {
    const { totalItems } = useCarrito();
    const { usuario, estaAutenticado, cerrarSesion } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        cerrarSesion();
        navigate('/');
    };

return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        
        <div className='flex items-center gap-x-2'>
            <img src='/flag-mexico.svg' width={50} height={40} />
        
            <Link to="/" className="text-xl font-bold text-blue-600">
                MexShop
            </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Lista de compras
            </Link>
            <Link to="/tarjetas" className="text-gray-700 hover:text-blue-600 transition-colors">
                Mis tarjetas
            </Link>
            <Link to="/perfil" className="text-gray-700 hover:text-blue-600 transition-colors">
                Mi perfil
            </Link>
        </div>

        <div className="flex items-center gap-4">
            <Link to="/carrito" className="relative text-gray-700 hover:text-blue-600">
                🛒
                {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                </span>
                )}
            </Link>

            {estaAutenticado ? (
                <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">Hola, {usuario.nombre}</span>
                    <button
                        onClick={handleLogout}
                        className="text-gray-700 hover:text-blue-600 font-medium transition-colors text-sm"
                    >
                        Cerrar sesión
                    </button>
                </div>
            ) : (
                <>
                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                    Iniciar sesión
                </Link>
                <Link to="/registro" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Registrarse
                </Link>
                </>
            )}


            {/*
            <Link
                to="/login"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
                Iniciar sesión
            </Link>

            <Link
                to="/registro"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
            Registrarse
            </Link>
            */}
        </div>
        </div>
    </nav>
);
}

export default Navbar;