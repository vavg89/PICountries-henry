import styled from 'styled-components';

export const PaginationButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap; /* Permite que los botones se envuelvan en dispositivos pequeños */
`;

export const PaginationButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border-radius: 5em;
  background: ${props => (props.active ? 'orange' : 'white')};
  border: 1px solid orange;
  cursor: pointer;

  &:hover {
    background: ${props => (props.active ? 'orange' : 'lightgray')};
  }

  @media (max-width: 768px) {
    margin: 5px 0;
  }
`;
