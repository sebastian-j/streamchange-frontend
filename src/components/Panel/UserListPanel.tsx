import styled from 'styled-components';

export const UserListPanel = styled.div`
  background-color: ${(props) => props.theme.panelBackground};
  display: flex;
  flex-direction: column;
  flex-basis: 0;
  flex-grow: 1;
  min-height: 0;
  margin: 15px;
  overflow: hidden;
  padding: 15px;
  > ul {
    flex: 1 1 auto;
    list-style: none;
    margin: 0;
    min-height: 0;
    overflow-y: auto;
    padding: 0;
  }
  @media (orientation: portrait) {
    margin: 5px;
  }
`;
