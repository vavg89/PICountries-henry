import React from 'react';
import { LandingPageContainer, EnterButton } from './LandingPageStyle';
import { useNavigate } from 'react-router-dom';

// Definición del componente LandingPage
function LandingPage() {
  // Obtiene la función de navegación desde react-router-dom
  const navigate = useNavigate();

  // Manejador para el clic en el botón de ingreso
  const handleEnterButtonClick = () => {
    navigate('/redirect'); // Redirige a la ruta '/redirect' al hacer clic en el botón
  };

  // Renderiza el contenido de la página de inicio
  return (
    <div>
      {/* Contenedor de la página de inicio */}
      <LandingPageContainer>
        <h1>Bienvenidos a mi CountryPi</h1>
        <h2>Explora los países y sus actividades turísticas</h2>
        <EnterButton onClick={handleEnterButtonClick}>Ingresar</EnterButton>
        <div>
          <h2>Creado por Victor Vanderviest</h2>
          <h2>
            <p>vavg89.ar@gmail.com</p>
            <p>Buenos Aires, Argentina</p>
          </h2>
        </div>
      </LandingPageContainer>
    </div>
  );
}

// Exportar el componente LandingPage
export default LandingPage;
