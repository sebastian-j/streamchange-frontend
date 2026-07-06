import styled from 'styled-components';

export const TableHeaderButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.staticTextColor};
  padding: 14px 10px 14px 16px;
  outline: none;
  width: 100%;
  span {
    pointer-events: none;
  }
`;
