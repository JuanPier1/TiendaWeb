import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function ProtectedRoute() {
    const { estaAutenticado, cargando } = useAuth();
    const location = useLocation();

    if (cargando) {
        // Barra de carga
        return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <p className="text-gray-500">Cargando...</p>
        </div>
        );
    }

    if (!estaAutenticado) {
        // Redirige a login, guardando de dónde venía
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;