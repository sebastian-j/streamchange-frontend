import styled, { keyframes } from 'styled-components';

const SlideUp = keyframes`
  0% {
    transform: translateY(550px) translateX(100px);
  }
  20% {
    transform: translateY(550px) translateX(100px);
  }
  100% {
    transform: translateY(0px);
  }
`;

export const Wrapper = styled.div`
  animation: ${SlideUp} 0.7s ease-out;
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
    0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
  margin-top: 20px;
`;
