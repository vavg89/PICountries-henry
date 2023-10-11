import React from 'react';
import { StyledLabelG, StyledSelect, StyledOption } from '../StylesGeneral/StylesGeneral';

// Definición del componente ContinentFilter
const ContinentFilter = ({ onSelectContinent }) => {
  // Array de continentes
  const continents = ['Africa', 'South America', 'Asia', 'Europe', 'Oceania'];

  // Renderizar el componente
  return (
    <div>
      {/* Etiqueta para mostrar el título */}
      <StyledLabelG>
        <h3>Filtrar por Continente:</h3>
      </StyledLabelG>
      
      {/* Select para elegir un continente */}
      <StyledSelect onChange={(e) => onSelectContinent(e.target.value)}>
        {/* Opción por defecto para mostrar todos los continentes */}
        <StyledOption value="">Todos los continentes</StyledOption>
        
        {/* Mapear los continentes para crear opciones */}
        {continents.map((continent, index) => (
          <option key={index} value={continent}>
            {continent}
          </option>
        ))}
      </StyledSelect>
    </div>
  );
};

// Exportar el componente ContinentFilter
export default ContinentFilter;
