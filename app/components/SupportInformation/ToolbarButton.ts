import styled from 'styled-components';

const ToolbarButton = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.buttonTextColor};
  border-radius: 50%;
  height: 90%;
  padding: 7px 7px;
  position: relative;
  margin: 0 15px 0 0;
  text-decoration: none;
  &:hover {
    svg.border-hover {
      stroke-dashoffset: 0;
    }
  }
  .border {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    margin: auto;
  }
  .border-initial {
    border-radius: 50%;
    border: 1px solid;
    opacity: 0.2;
  }
  svg.border-hover {
    stroke: currentColor;
    stroke-dasharray: 1;
    stroke-dashoffset: 1;
    transition: stroke-dashoffset .25s cubic-bezier(.22,.28,.36,1);
    circle {
      r: calc(50% - .5px);
      transform: rotate(-90deg);
      transform-origin: 50% 50%;
      vector-effect: non-scaling-stroke;
    }
  }
`;

export default ToolbarButton;
