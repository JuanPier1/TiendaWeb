/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
*/
import { Routes, Route } from 'react-router-dom';
import { MainLayout, Login, Registro, ListaCompras, Perfil, MisTarjetas, AgregarTarjeta } from './indexBarrel.js'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<ListaCompras />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/tarjetas" element={<MisTarjetas />} />
        <Route path="/tarjetas/agregar" element={<AgregarTarjeta />} />
      </Route>
      //Errores
      <Route
        path="*"
        element={
          <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
            <h1 className="text-6xl font-bold text-blue-600">404</h1>
            <p className="text-gray-600">La página que buscas no existe.</p>
            <a
              href="/"
              className="mt-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Volver al inicio
            </a>
          </div>
        } 
      />
    </Routes>
  );
}

export default App;