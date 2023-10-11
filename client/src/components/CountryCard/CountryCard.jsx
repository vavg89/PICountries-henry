import React, { useState } from 'react';
import { DivCard, ImgCard } from './CountryCardStyle';

import CountryDetail from '../CountryDetail/CountryDetail'; // Importa el componente CountryDetail

// Definición del componente CountryCard
function CountryCard({ country }) {
  const [isModalOpen, setIsModalOpen] = useState(true); // Inicialmente se mostrará automáticamente

  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Renderizar el componente
  return (
    <div>
      <DivCard>
        {/* Imagen de la bandera del país */}
        <ImgCard src={country.flags} alt={`${country.name} Flag`} />
        <div>
          {/* Nombre del país */}
          <h3>{country.name}</h3>
          {/* Continente del país */}
          <h2>{country.continents}</h2>
        </div>
      </DivCard>
      
      {isModalOpen && (
        <CountryDetail countryId={country.cca3} onClose={closeModal} />
      )}
    </div>
  );
}

// Exportar el componente CountryCard
export default CountryCard;