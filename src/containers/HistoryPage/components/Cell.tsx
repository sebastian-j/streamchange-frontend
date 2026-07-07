import styled from 'styled-components';

export const Cell = styled.td`
  border-bottom: 1px solid #5e5e5e;
  border-spacing: 0;
  border-collapse: collapse;
  color: ${(props) => props.theme.staticTextColor};
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  &.image {
    max-width: 100px;
  }
  &.textLeft {
    font-size: 1rem;
    padding: 14px 30px 14px 16px;
    text-align: left;
  }
  &.text {
    font-size: 0.875rem;
    padding: 14px 30px 14px 16px;
    text-align: right;
  }
`;
