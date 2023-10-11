import styled from 'styled-components';



export const CountryDetailContainer = styled.div
`
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(255,143,38,1) 0%, rgba(150,126,197,1) 48%, rgba(0,255,222,1) 100%);
  display: flex;
  border: 1px solid #ccc;
  margin-top: 20px;
  
  
`;

export const FlagContainer = styled.div`

  flex: 1;
  padding: 20px;
`;

export const FlagImage = styled.img`
  
  max-width: 100%;
  height: auto;
`;

export const DetailContainer = styled.div`

  flex: 1;
  padding: 20px;
`;

export const DetailItem = styled.p`
  margin: 5px 0;
  font-weight: bold;
  color: black; 
`;
