import styled, { keyframes } from 'styled-components';

const ShowWinner = keyframes`
  from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const RaffleWinner = styled.span`
  color: white;
  display: block;
  font-size: 2rem;
  opacity: 0;
  margin-top: 76vh;
  text-align: center;
  animation: ${ShowWinner} 0.5s linear 7.1s;
  animation-fill-mode: forwards;
`;

export default RaffleWinner;
