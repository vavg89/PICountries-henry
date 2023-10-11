// Importar las librerías y componentes necesarios
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCountries } from '../../redux/actions/countriesActions';
import { getActivities } from '../../redux/actions/activitiesActions';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Importar estilos y componentes personalizados
import {
  StyledFormField,
  StyledCountryCheckbox,
  StyledCountryCheckWrapper,
  StyledErrorMessage,
  FormContainer,
} from './FormPageStyle';// Importar componentes y estilos desde el archivo FormPageStyle.js
import { StyledLabelG, StyledInput, BottonG, StyledSelect, DivG } from '../StylesGeneral/StylesGeneral';

const capitalizeWords = (str) => {
  return str.toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
};

// Definir el componente FormPage
const FormPage = () => {
  // Definir estados locales usando hooks
  const dispatch = useDispatch();// Manejador para activar acciones de Redux
  const countries = useSelector(state => state.countries);// Obtener la lista de países desde el estado de Redux
  const activities = useSelector(state => state.activities);// Obtener la lista de actividades desde el estado de Redux
  const navigate = useNavigate();// Hook para la navegación entre páginas

  // Cargar la lista de países al cargar el componente
  useEffect(() => {
    dispatch(getCountries());// Disparar la acción para obtener la lista de países desde Redux
  }, [dispatch]);// Se ejecuta cuando el componente se monta y cuando 'dispatch' cambia

  // Estados locales para almacenar los datos del formulario
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [nameExistsError, setNameExistsError] = useState(false);; 
  const [difficulty, setDifficulty] = useState('');
  const [difficultyError, setDifficultyError] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [hoursError, setHoursError] = useState('');
  const [minutesError, setMinutesError] = useState('');
  const [season, setSeason] = useState('');
  const [seasonError, setSeasonError] = useState('');
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCountriesError, setSelectedCountriesError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [inputBusqueda, setInputBusqueda] = useState('');
 
  // Funciones de validación para cada campo del formulario
  const validateName = (value) => {
    if (!value) {
      return 'Por favor, ingrese el nombre de la actividad';
    }
    if (/[^a-zA-Z\s]/.test(value)) {
      return 'El nombre no debe contener caracteres especiales ni números';
    }
    return '';
  };

  const validateDifficulty = (value) => {
    const difficultyPattern = /^[1-5]$/;
    if (!difficultyPattern.test(value.toString())) {
      return 'Debe seleccionar un nivel de dificultad';
    }
    return '';
  };

  const validateHours = (value) => {
    if (!value) {
      return 'Por favor, ingrese las horas';
    }
    if (isNaN(value) || value < 0) {
      return 'No se permite texto ni números negativos';
    }
    if (value > 23) {
      return 'Debe respetar el límite de 23 horas y 59 minutos';
    }
    if (value.length<2) {
      return 'Debe proporcionar dos digitos en el campo de horas';
    }
    return '';
  };

 const validateMinutes = (value) => {
    if (!value) {
      return 'Por favor, ingrese los minutos';
    }
    if (isNaN(value) || value < 0) {
      return 'No se permite texto ni números negativos';
    }
    if (value > 59) {
      return 'Debe respetar el límite de 59 minutos';
    }
    if (value.length<2) {
      return 'Debe proporcionar dos digitos en el campo de minutos';
    }
    return '';
  };
 
    
  const validateSeason = (value) => {
    if (!value.trim()) {
      return 'La temporada no puede estar vacía.';
    }
    return '';
  };

  // Manejadores de cambio para los campos del formulario
  const handleNameChange = (e) => {
    const value = e.target.value;
    const formattedValue = capitalizeWords(value); // Convertir la primera letra de cada palabra a mayúscula
    setName(formattedValue);
    setNameError(validateName(formattedValue));

    // Verificar si la actividad ya existe en la lista de actividades
    const activityExists = activities.some(activity => activity.name === formattedValue);
    setNameExistsError(activityExists);
  };
  
  const handleDifficultyChange = (e) => {
    const value = e.target.value;
    setDifficulty(value);
    setDifficultyError(validateDifficulty(value));
  };

  // Manejador de cambio para las horas
  const handleHoursChange = (e) => {
    const value = e.target.value;
    setHours(value);
    setHoursError(validateHours(value));
  };

  // Manejador de cambio para los minutos
  const handleMinutesChange = (e) => {
    const value = e.target.value;
    setMinutes(value);
    setMinutesError(validateMinutes(value));
  };

  const handleSeasonChange = (e) => {
    const value = e.target.value;
    setSeason(value);
    setSeasonError(validateSeason(value));
  };

  const handleInputBusquedaChange = (e) => {
    setInputBusqueda(e.target.value);
  };

  // Manejador de cambio para la selección de países
  const handleCountryChange = (e, countryId) => {
    const isChecked = e.target.checked;
     if (isChecked) {
      setSelectedCountries([...selectedCountries, countryId]);
      setSelectedCountriesError(false); // Eliminar el mensaje de error
     } else {
      setSelectedCountries(selectedCountries.filter(id => id !== countryId));
     }
  };
  

  // Manejador para crear una nueva actividad
  const handleCreateActivity = async () => {
    // Validaciones de los campos del formulario
    if (
      !name ||
      !difficulty ||
      (!hours && !minutes) ||
      !season ||
      difficultyError !== '' || 
      hoursError !== '' || 
      minutesError !== '' ||
      seasonError !== '' || 
      selectedCountries.length === 0 || 
      nameError !== '' ||
      nameExistsError !== false
      ) {
      setErrorMessage('Por favor debe completar todos los campos');
      setNameError(validateName(name));
      setDifficultyError(validateDifficulty(difficulty));
      setHoursError(validateHours(hours));
      setMinutesError(validateMinutes(minutes));
      setSeasonError(validateSeason(season));
      setSelectedCountriesError(selectedCountries.length === 0);
      return;
    }

    // Crear los datos para la nueva actividad
    const newActivityData = {
      name: name,
      difficulty: parseInt(difficulty),
      duration: parseFloat(`${hours}.${minutes}`),
      season: season,
      countries: selectedCountries.map(countryId => countries.find(country => country.id === countryId).cca3),
    };

    try {
      // Enviar la solicitud POST para crear la actividad
      const response = await axios.post('http://localhost:3001/activities', newActivityData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

     // Actualizar la lista de actividades
     dispatch(getActivities());
     console.log('Actividad creada exitosamente:', response.data);

     // Navegar a la página de inicio
     navigate('/HomePage');

       // Restablecer los campos del formulario y mensajes de error
       setName('');
       setDifficulty('');
       setHours('');
       setMinutes('');
       setSeason('');
       setSelectedCountries([]);
       setSelectedCountriesError(false);
       setErrorMessage('');
     } catch (error) {
       console.error('Error al crear la actividad:', error);
       setErrorMessage('Hubo un error al crear la actividad.');
     }
   };

  // Renderizar el componente del formulario
  return (
    <FormContainer>
    <DivG>
      <h1>Crear Actividad Turística</h1>
    </DivG>
    <StyledErrorMessage>{errorMessage}</StyledErrorMessage>
    <form>
    <StyledFormField>
          <StyledLabelG>Nombre:</StyledLabelG>
          <StyledInput
            type="text"
            value={name}
            onChange={handleNameChange}
          />
          {nameExistsError && (
            <StyledErrorMessage>
              ¡Esta actividad ya está registrada!
            </StyledErrorMessage>
          )}
          <StyledErrorMessage>{nameError}</StyledErrorMessage>
        </StyledFormField>
        <StyledFormField>
          <StyledLabelG>Dificultad:</StyledLabelG>
          <StyledSelect value={difficulty} onChange={handleDifficultyChange}>
            <option value="">Seleccione una dificultad</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </StyledSelect>
          <StyledErrorMessage>{difficultyError}</StyledErrorMessage>
        </StyledFormField>
       {/* Campos para la duración */}
       <StyledFormField>
          <StyledLabelG>Duración:</StyledLabelG>
          <StyledInput
            type="number"
            value={hours}
            onChange={handleHoursChange}
            placeholder="Horas"
          />
          <StyledInput
            type="number"
            value={minutes}
            onChange={handleMinutesChange}
            placeholder="Minutos"
          />
          <StyledErrorMessage>{hoursError || minutesError}</StyledErrorMessage>
        </StyledFormField>
        <StyledFormField>
          <StyledLabelG>Temporada:</StyledLabelG>
          <StyledSelect value={season} onChange={handleSeasonChange}>
            <option value="">Seleccione una temporada</option>
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
            <option value="Primavera">Primavera</option>
          </StyledSelect>
          <StyledErrorMessage>{seasonError}</StyledErrorMessage>
        </StyledFormField>
        <StyledFormField>
          <StyledLabelG>Seleccione los países:</StyledLabelG>
          <StyledInput
            type="text"
            placeholder="Buscar país"
            value={inputBusqueda}
            onChange={handleInputBusquedaChange}
            style={{ marginBottom: '10px' }}
          />
          <StyledCountryCheckWrapper>
            {countries
              .filter(pais => pais.name.toLowerCase().includes(inputBusqueda.toLowerCase()))
              .map(pais => (
                <StyledCountryCheckbox key={pais.id}>
                  <StyledInput
                    type="checkbox"
                    value={pais.id}
                    checked={selectedCountries.includes(pais.id)}
                    onChange={(e) => handleCountryChange(e, pais.id)}
                  />
                  {pais.name}
                </StyledCountryCheckbox>
              ))}
          </StyledCountryCheckWrapper>
          {selectedCountriesError && (
            <StyledErrorMessage>
              Por favor seleccione al menos un país.
            </StyledErrorMessage>
          )}
        </StyledFormField>
        <BottonG type="button" onClick={handleCreateActivity}>
          Crear Actividad
        </BottonG>
      </form>
    </FormContainer>
  );
};

// Exportar el componente FormPage
export default FormPage;
