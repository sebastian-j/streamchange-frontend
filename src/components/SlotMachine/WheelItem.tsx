import styled, { keyframes } from 'styled-components';

const BreathingImg = keyframes`
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(1.05); }
  100% { opacity: 1; transform: scale(1); }
`;

const glow = keyframes`
  from { filter: drop-shadow(0 0 2px #fff) drop-shadow(0 0 4px #fff); } 
  to { filter: drop-shadow(0 0 5px #fff) drop-shadow(0 0 10px rgb(255, 230, 0)); }
`;

const WheelItem = styled.div`
  position: absolute;

  img {
    height: 14vh;
    display: flex;
    objectfit: contain;
    margin: 0 auto;
    filter: drop-shadow(0px 0px 5px rgb(255, 255, 55));
    animation:
      ${BreathingImg} 0.5s linear infinite,
      ${glow} 0.75s infinite alternate;
  }

  .symbolContainer img {
    transform: translateZ(0);
    backface-visibility: hidden;
  }

  .vroller-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75vh;
    width: 15.8vw;
    height: 14vh;
    box-sizing: border-box;
    padding: 0 7.5vh;
  }

  .vroller-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .vroller-badge-inner {
    width: 1.8vw;
    height: 3vh;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
  .vroller-badge-inner img,
  .vroller-badge-inner svg {
    width: 1.8vw !important;
    height: 1.85vh !important;
    filter: none !important;
    animation: none !important;
    object-fit: contain;
  }
  .vroller-nickname {
    display: inline-block;
    text-align: center;
    font-size: 2.4vh;
    font-weight: bold;
    word-break: break-word;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
export default WheelItem;
