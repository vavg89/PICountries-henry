import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Importa las funciones necesarias

import LandingPage from './components/LandingPage/LandingPage'; // Importa el componente de la página de inicio
import HomePage from './components/HomePage/HomePage'; // Importa el componente de la página principal
import CountryDetail from './components/CountryDetail/CountryDetail'; // Importa el componente de detalle de país
import FormPage from './components/FormPage/FormPage'; // Importa el componente de formulario

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Define las rutas y sus elementos correspondientes */}
        <Route path="/" element={<LandingPage />} /> {/* Ruta para la página de inicio */}
        <Route path="/HomePage" element={<HomePage />} /> {/* Ruta para la página principal */}
        <Route path="/redirect" element={<Navigate to="/HomePage" />} /> {/* Redirige a /HomePage */}
        <Route path="/countries/:cca3" element={<CountryDetail />} /> {/* Ruta para el detalle de país */}
        <Route path="/form" element={<FormPage />} /> {/* Ruta para el formulario */}
      </Routes>
    </div>
  );
}

export default App;
