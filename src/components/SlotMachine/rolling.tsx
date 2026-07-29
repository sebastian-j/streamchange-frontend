import styled, { keyframes } from 'styled-components';
const roll = keyframes`
  from { transform: translateY(0); }
  to { transform: translateY(-900vh); }
`;

const SingleRoll = keyframes`
  0% { transform: translateY(0); }
  5% { transform: translateY(-166.66vh); }
  10% { transform: translateY(-300vh); }
  15% { transform: translateY(-398vh); }
  20% { transform: translateY(-476.85vh); }
  25% { transform: translateY(-546.3vh); }
  30% { transform: translateY(-590.28vh); }
  35% { transform: translateY(-631.94vh); }
  40% { transform: translateY(-671.3vh); }
  45% { transform: translateY(-708.33vh); }
  50% { transform: translateY(-743.055vh); }
  55% { transform: translateY(-773.203vh); }
  60% { transform: translateY(-796.296vh); }
  65% { transform: translateY(-810.18vh); }
  70% { transform: translateY(-817.131vh); }
  75% { transform: translateY(-826.074vh); }
  80% { transform: translateY(-833.704vh); }
  85% { transform: translateY(-839.333vh); }
  90% { transform: translateY(-844.963vh); }
  95% { transform: translateY(-846.592vh); }
  100% { transform: translateY(-848.592vh); }
`;

const SymbolContainer = styled.div`
  position: absolute;
  height: 1250vh;
  width: 12vw;
  animation: ${roll} 60s linear infinite;
  transition: transform 0.5s ease-out;
  will-change: transform;

  &.is-rolling {
    animation: ${SingleRoll} 10s linear forwards !important;
    transition: transform 10s cubic-bezier(0.2, 0.8, 0.3, 1);
  }
`;

export default SymbolContainer;
