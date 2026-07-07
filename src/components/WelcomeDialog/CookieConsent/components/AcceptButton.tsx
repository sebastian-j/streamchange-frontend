import styled from 'styled-components';

export const AcceptButton = styled.button`
  background: white;
  border: 2px solid #0084b5;
  border-radius: 4px;
  color: #0084b5;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.1em;
  padding: 0.3em 0.4em;
  margin: 15px;
  :hover {
    background-color: #0084b5;
    color: white;
  }
  @media (orientation: portrait) {
    margin: 5px;
  }
`;
