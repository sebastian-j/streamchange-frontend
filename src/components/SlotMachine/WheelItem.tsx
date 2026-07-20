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
const glow = keyframes`
from{
filter: drop-shadow(0 0 2px #fff) drop-shadow(0 0 4px #fff));
} 
to
{
filter: drop-shadow(0 0 5px #fff) drop-shadow(0 0 10px rgb(255, 230, 0));
}
`;
const WheelItem = styled.div`
  position: absolute;
  img {
    height: 11vh;
    filter: drop-shadow(0px 0px 5px rgb(255, 255, 55)); 
    animation: ${BreathingImg} 0.5s linear infinite, ${glow} 2s infinite alternate;
  }
    .symbol-container img {
  transform: translateZ(0);
  backface-visibility: hidden; 
  perspective: 1000px;
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
