import styled from 'styled-components';

const Panel = styled.div`
  background-color: ${(props) => props.theme.panelBackground};
  flex-basis: 0;
  flex-grow: 1;
  margin: 15px;
  padding: 15px;
`;

export default Panel;
