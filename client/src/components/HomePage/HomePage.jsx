import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BottonG, CountryListContainer, HomePageContainer, PaginationContainer,
  DivG, StyledLabelG, StyledSelect, Query
} from '../StylesGeneral/StylesGeneral';
import CountryCard from '../CountryCard/CountryCard';
import { getCountries } from '../../redux/actions/countriesActions';
import Pagination from '../Pagination/Pagination';
import CountryDetail from '../CountryDetail/CountryDetail';
import ContinentFilter from '../ContinentFilter/ContinentFilter';
import ActivityFilter from '../ActivityFilter/ActivityFilter';
import { searchCountriesByName } from '../../redux/actions/searchActions';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';
import { getActivities } from '../../redux/actions/activitiesActions';

const PageSize = 10;

// Definición del componente HomePage
const HomePage = () => {
  // Obtener los países y actividades del estado global
  const countries = useSelector(state => state.countries);
  const activities = useSelector(state => state.activities);
  const dispatch = useDispatch();

  // Estados locales para manejar la paginación, país seleccionado y filtros
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [selectedContinent, setSelectedContinent] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  // Obtener la lista de países y actividades al cargar el componente
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  // Calcular índices de inicio y fin para la paginación
  const startIndex = (currentPage - 1) * PageSize;
  const endIndex = startIndex + PageSize;

  // Filtrar y ordenar los países según los filtros y orden seleccionados
  const filteredAndSortedCountries = countries
    .filter(country => !selectedContinent || country.continents === selectedContinent)
    .filter(country =>
      !selectedActivity ||
      (selectedActivity === 'Todas las actividades' ||
        selectedActivity.countries.includes(country.name))
    )
    .slice()
    .sort((a, b) => {
      if (sortField === 'name') {
        return sortDirection === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortField === 'population') {
        return sortDirection === 'asc'
          ? a.population - b.population
          : b.population - a.population;
      }
      return 0;
    });

  // Calcular el número total de páginas para la paginación
  const totalPages = Math.ceil(filteredAndSortedCountries.length / PageSize);

  // Manejador para cambiar la página actual de la paginación
  const handlePageChange = newPage => {
    setCurrentPage(newPage);
    setSelectedActivity(null);
  };

  // Manejador para mostrar los detalles de un país
  const handleCountryButtonClick = countryId => {
    setSelectedCountryId(countryId);
  };

  // Manejador para buscar países por nombre
  const handleSearch = name => {
    dispatch(searchCountriesByName(name));
    setSelectedContinent(null);
    setSelectedActivity(null);
    setCurrentPage(1); // Reiniciar a la página 1 cuando se busque un país
  };

  // Manejador para borrar la búsqueda
  const handleClearSearch = () => {
    dispatch(getCountries());
    setCurrentPage(1);
    setSelectedContinent(null);
    setSelectedActivity(null);
  };

  const handleSelectContinent = continent => {
    setSelectedContinent(continent);
    setSelectedActivity(null);
    setCurrentPage(1); // Reiniciar a la página 1 cuando se aplique un filtro
  };

  const handleSelectActivity = activityCountries => {
    setSelectedActivity({ countries: activityCountries });
    setCurrentPage(1); // Reiniciar a la página 1 cuando se aplique un filtro
  };

  // Renderizar el componente de la página de inicio
  return (
    <HomePageContainer>
      <DivG>
        <h1>Lista de Países</h1>
      </DivG>
      <Query>
        {/* Contenedor para los filtros y búsqueda */}
        <div>
            <div>
          <SearchBar onSearch={handleSearch} onClearSearch={handleClearSearch} />
          <ContinentFilter onSelectContinent={handleSelectContinent} />
          <ActivityFilter
            activities={activities}
            onSelectActivity={handleSelectActivity}
            setCurrentPage={setCurrentPage}
          />
       
        </div> 
        </div>
     
        <div>
            <Link to="/form">
              <h3>Agregar Actividad</h3>
            </Link>
          </div>
        {/* Contenedor para la ordenación */}
        <div>
          <StyledLabelG>
            <h6>Ordenar por:</h6>
          </StyledLabelG>
          <StyledSelect value={sortField} onChange={e => setSortField(e.target.value)}>
            <option value="name">Nombre</option>
            <option value="population">Población</option>
          </StyledSelect>
          <BottonG onClick={() => setSortDirection('asc')}>Ascendente</BottonG>
          <BottonG onClick={() => setSortDirection('desc')}>Descendente</BottonG>
        </div>
        
        {/* Contenedor para la lista de países */}
        <CountryListContainer>
          {filteredAndSortedCountries
            .slice(startIndex, endIndex)
            .map(country => (
              <CountryCard
                key={country.id}
                country={country}
                onShowDetail={handleCountryButtonClick}
              />
            ))}
        </CountryListContainer>
        
        {/* Contenedor para la paginación */}
        <PaginationContainer>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </PaginationContainer>
        
        {/* Mostrar detalles de un país seleccionado */}
        {selectedCountryId && <CountryDetail countryId={selectedCountryId} />}
      </Query>
    </HomePageContainer>
  );
};

// Exportar el componente HomePage
export default HomePage;
