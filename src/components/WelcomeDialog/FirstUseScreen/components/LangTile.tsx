import styled from 'styled-components';

export const LangTile = styled.span`
  position: absolute;
  transform: translate(0, -50%);
  left: 5px;
  right: 5px;
  top: 50%;
  transition: all 300ms ease;
  font-size: 1.2vw;
  user-select: none;
  @media (orientation: portrait) {
    font-size: 5vw;
  }
  img {
    margin-right: 10%;
    width: 20%;
  }
`;
