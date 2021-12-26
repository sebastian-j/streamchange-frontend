import styled from 'styled-components';

export const UserListPanel = styled.div`
  background-color: ${(props) => props.theme.panelBackground};
  display: flex;
  flex-direction: column;
  flex-basis: 0;
  flex-grow: 1;
  margin: 15px;
  padding: 15px;
  > ul {
    overflow-y: scroll;
    list-style: none;
    padding: 0;
  }
  @media (orientation: portrait) {
    margin: 5px;
  }
`;
