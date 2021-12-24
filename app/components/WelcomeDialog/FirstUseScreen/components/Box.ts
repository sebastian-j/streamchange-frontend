import styled from 'styled-components';

export const Box = styled.div`
  width: 11vw;
  height: 11vw;
  background-color: #ffffffd9;
  transition: all 300ms ease;
  will-change: transition;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  position: relative;
  font-family: sans-serif;
  &.left {
    border-radius: 5px 0 0 5px;
  }
  &.right {
    border-radius: 0 5px 5px 0;
  }
  @media (orientation: portrait) {
    height: 40vw;
    width: 40vw;
  }
  img {
    margin-top: 10%;
    width: 96%;
  }
`;
