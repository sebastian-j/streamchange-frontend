import styled from 'styled-components';

export const ImageButton = styled.button`
  background: none;
  border: none;
  outline: none;
  @media (orientation: portrait) {
    margin: 0 -20px 0 -10px;
  }
  img {
    height: 140px;
  }
`;
