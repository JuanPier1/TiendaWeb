import { Link } from 'react-router-dom';

function Navbar() {
return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-bold text-blue-600">
            MexShop
        </Link>

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

        <div className="flex items-center gap-3">
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
        </div>
        </div>
    </nav>
);
}

export default Navbar;