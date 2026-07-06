import styled from 'styled-components';

export const UrlContainer = styled.div`
  display: flex;
  background-color: hsl(300, 2%, 12%);
  border-radius: 4px;
  input {
    color: #e1e0e1;
    flex: 1;
    border: none;
    background-color: #00000000;
    overflow: hidden;
    padding: 8px 6px;
  }
  div {
    flex: 0.2;
  }
  div button {
    background-color: transparent;
    border: none;
    color: rgb(27, 142, 230);
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    outline: none;
    padding: 10px 14px;
    text-transform: uppercase;
  }
`;
