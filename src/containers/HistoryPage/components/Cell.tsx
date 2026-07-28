import styled from 'styled-components';

export const Cell = styled.td`
  border-bottom: 1px solid ${(props) => `${props.theme.staticTextColor}1a`};
  color: ${(props) => props.theme.staticTextColor};
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  padding: 14px 20px 14px 12px;
  text-align: left;
  vertical-align: middle;
  &.identity {
    font-size: 1rem;
    min-width: 220px;
  }
  &.text {
    font-size: 0.875rem;
  }
`;
