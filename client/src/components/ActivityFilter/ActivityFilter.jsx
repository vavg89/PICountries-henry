import React, { useEffect, useState } from 'react';
import { StyledLabelG, StyledSelect, BottonG } from '../StylesGeneral/StylesGeneral';
import { useNavigate } from 'react-router-dom';

// Definición del componente ActivityFilter
const ActivityFilter = ({ activities, onSelectActivity, onClearActivityFilter }) => {
  // Estado local para la actividad seleccionada
  const [selectedActivity, setSelectedActivity] = useState(null);
  // Obtener la función de navegación
  const navigate = useNavigate();

  // Efecto para gestionar el filtro basado en la actividad seleccionada
  useEffect(() => {
    // Si hay una actividad seleccionada
    if (selectedActivity) {
      // Buscar la actividad correspondiente en el array de actividades
      const activity = activities.find(activity => activity.name === selectedActivity);
      // Si se encontró la actividad, llamar a onSelectActivity con los países asociados
      if (activity) {
        onSelectActivity(activity.countries);
      }
    }
  }, [selectedActivity, activities, onSelectActivity]);

  // Función para borrar el filtro
  const handleClearFilter = () => {
    // Restablecer la actividad seleccionada
    setSelectedActivity('');
    // Llamar a onSelectActivity con una cadena vacía para limpiar el filtro
    onSelectActivity('');
    // Navegar a la ruta '/redirect'
    navigate('/redirect');
  };

  // Renderizar el componente
  return (
    <div>
      {/* Etiqueta para mostrar el título */}
      <StyledLabelG>
        <h3>Filtrar por actividad:</h3>
      </StyledLabelG>
      
      {/* Select para elegir una actividad */}
      <StyledSelect
        value={selectedActivity || ''}
        onChange={e => setSelectedActivity(e.target.value)}
      >
        {/* Opción por defecto */}
        <option value="">Seleccione una actividad</option>
        {/* Mapear actividades para crear opciones */}
        {activities.map(activity => (
          <option key={activity.id} value={activity.name}>
            {activity.name}
          </option>
        ))}
      </StyledSelect>
      
      {/* Mostrar botón "Borrar filtro" si hay una actividad seleccionada */}
      {selectedActivity && <BottonG onClick={handleClearFilter}>Borrar filtro</BottonG>}
    </div>
  );
};

// Exportar el componente ActivityFilter
export default ActivityFilter;
