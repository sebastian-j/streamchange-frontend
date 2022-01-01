import styled from 'styled-components';

export const TopBar = styled.div`
  background-color: ${(props) => props.theme.panelBackground};
  display: flex;
  justify-content: space-between;
  div:nth-child(1) {
    height: 5vh;
    img {
      height: 100%;
    }
  }
  @media (orientation: portrait) {
    flex-direction: column;
  }
`;
