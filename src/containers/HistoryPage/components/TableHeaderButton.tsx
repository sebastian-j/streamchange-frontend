import styled from 'styled-components';

export const TableHeaderButton = styled.button`
  align-items: center;
  background: none;
  border: none;
  color: ${(props) => props.theme.staticTextColor};
  cursor: pointer;
  display: inline-flex;
  gap: 4px;
  outline: none;
  padding: 10px 12px;
  text-align: left;
  transition: background-color 120ms ease-out;
  width: 100%;
  &:hover {
    background-color: ${(props) => props.theme.iconButtonBackground};
  }
  span {
    pointer-events: none;
  }
`;
