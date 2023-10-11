import styled from 'styled-components';

export const StyledFormField = styled.div`

  padding: 10px;
  margin-bottom: 15px;
  color: darkblue;
`;

export const StyledCountryCheckbox = styled.label`
  display: block;
  margin-bottom: 5px;
`;

export const StyledCountryCheckWrapper = styled.div`
max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
  padding: 5px;
  display: grid;
  grid-template-columns: repeat(1, 1fr); 
  gap: 10px;
`;

export const StyledErrorMessage = styled.p`
  color: red;
`;

export const FormContainer = styled.div
`
  
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100vh; /* O la altura que desees */

 
  
`;