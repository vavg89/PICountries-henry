import React from 'react';
import { PaginationButtons, PaginationButton } from './PaginationStyle';

// Definición del componente Pagination
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Crear un array de números de página según el total de páginas
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <PaginationButtons>
      {/* Botón "Anterior" */}
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Anterior
      </PaginationButton>
      
      {/* Mapear los números de página y renderizar los botones */}
      {pageNumbers.map(pageNumber => (
        <PaginationButton
          key={pageNumber}
          active={pageNumber === currentPage}
          onClick={() => onPageChange(pageNumber)}
          isHovered={pageNumber === currentPage}
        >
          {pageNumber}
        </PaginationButton>
      ))}
      
      {/* Botón "Siguiente" */}
      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </PaginationButton>
    </PaginationButtons>
  );
};

// Exportar el componente Pagination
export default Pagination;
