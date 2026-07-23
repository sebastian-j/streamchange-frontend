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
    height: 11vh;
    display: block;
    margin: 0 auto;
    filter: drop-shadow(0px 0px 5px rgb(255, 255, 55)); 
    animation: ${BreathingImg} 0.5s linear infinite, ${glow} 0.75s infinite alternate;
  }

  .symbol-container img {
    transform: translateZ(0);
    backface-visibility: hidden; 
  }

  .vroller-cell {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    height: 150px;
    box-sizing: border-box;
    padding: 0 10px;
  }

  .vroller-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    filter: drop-shadow(0px 0px 4px rgb(255, 255, 55));
  }

  .vroller-badge-inner {
    width: 32px;
    height:32px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }
.vroller-badge-inner img, 
  .vroller-badge-inner svg {
    width: 20px !important;
    height: 20px !important;
    object-fit: contain;
  }
  .vroller-nickname {
    display: inline-block;
    text-align: left;
    font-size: 14px;
    font-weight: bold;
    word-break: break-word;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    filter: drop-shadow(0px 0px 3px rgb(255, 255, 55));
  }
`;
export default WheelItem;