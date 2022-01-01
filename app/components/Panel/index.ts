import styled from 'styled-components';

const Panel = styled.div`
  background-color: ${(props) => props.theme.panelBackground};
  flex-basis: 0;
  flex-grow: 1;
  margin: 15px;
  padding: 15px;
  @media (orientation: portrait) {
    min-height: 95vh;
    margin: 5px;
    &.chat {
      height: 95vh;
    }
  }
`;

export default Panel;
