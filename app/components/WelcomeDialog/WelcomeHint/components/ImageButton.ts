import styled, { keyframes } from 'styled-components';

const Shake = keyframes`
  10% {
    transform: rotate(10deg);
  }
  50% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(0);
  }
`;


export const ImageButton = styled.button`
  background: none;
  border: none;
  outline: none;
  img {
    cursor: pointer;
    height: 140px;
  }
  &:hover {
    img {
      animation: ${Shake} 0.5s linear;
    }
  }
  @media (orientation: portrait) {
    margin: 0 -20px 0 -10px;
  }
`;
