import styled, { keyframes } from 'styled-components';

const BreathingImg = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(1.05)
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

const WheelItem = styled.div`
  position: absolute;
  img {
    border-radius: 40%;
    height: 11vh;
    animation: ${BreathingImg} 2s linear infinite;
  }
  span {
    font-size: 0.8rem;
    display: block;
    position: absolute;
    margin-top: 5px;
    transform: translateX(10%);
  }
`;

export default WheelItem;
