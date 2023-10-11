import React from 'react';
import ReactDOM from 'react-dom'; // Importa ReactDOM
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter para el enrutamiento
import './index.css';
import App from './App'; // Importa el componente principal de la aplicación

import { Provider } from 'react-redux'; // Importa Provider de react-redux
import store from './redux/store/store'; // Importa la tienda de Redux

// Crea un elemento de raíz con ReactDOM.createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza la aplicación dentro del Provider y BrowserRouter
root.render(
  <Provider store={store}>
    
    <BrowserRouter>
      <App /> {/* Renderiza el componente principal de la aplicación */}
    </BrowserRouter>
  </Provider>
);
