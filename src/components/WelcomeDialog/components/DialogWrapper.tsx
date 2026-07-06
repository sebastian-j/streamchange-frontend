import styled, { keyframes } from 'styled-components';

const SlideDown = keyframes`
  0% {
    transform: translateY(-650px) translateX(-100px);
  }
  20% {
    transform: translateY(-650px) translateX(-100px);
  }
  100% {
    transform: translateY(0px) translateX(0px);
  }
`;

const DialogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 55%;
  left: 30%;
  transform: translate(-50%, -50%);

  @media (orientation: portrait) {
    left: 50%;
    top: 20%;
    width: 98%;
    transform: translate(-50%, 0%);
  }

  .dialog {
    animation: ${SlideDown} 0.7s ease-out;
    background-color: white;
    box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
      0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.52);
    border-radius: 4px;
    max-width: 600px;
    z-index: -1;

    .title {
      font-size: 1.25rem;
      font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
      font-weight: 500;
      line-height: 1.6;
      letter-spacing: 0.0075em;
      padding: 16px 24px;
    }
    .content {
      padding: 8px 24px;
      .text {
        color: rgba(0, 0, 0, 0.54);
        font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
        line-height: 1.5;
        margin-bottom: 12px;
      }
    }
    .actions {
      flex: 0 0 auto;
      display: flex;
      padding: 8px;
      align-items: center;
      justify-content: flex-end;
    }
  }
`;

export default DialogWrapper;
