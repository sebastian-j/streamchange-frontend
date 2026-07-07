import styled from 'styled-components';

export const LangBox = styled.div`
  width: 11vw;
  height: 4vw;
  background-color: #ffffffd9;
  transition: all 250ms ease;
  will-change: transition;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  position: relative;
  font-family: sans-serif;
  &.left {
    border-radius: 4px 0 0 4px;
  }
  &.right {
    border-radius: 0 4px 4px 0;
  }
  @media (orientation: portrait) {
    height: 14vw;
    width: 40vw;
  }
`;
