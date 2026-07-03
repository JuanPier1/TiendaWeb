import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

function MainLayout() {
return (
    <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className='flex-1'>
            {/*Outlet es donde React Router va a "inyectar" la página activa.
            Así el Navbar y el Footer no se repiten en cada página.*/}
            <Outlet />
        </main>

        <Footer />
    </div>
);
}

export default MainLayout;