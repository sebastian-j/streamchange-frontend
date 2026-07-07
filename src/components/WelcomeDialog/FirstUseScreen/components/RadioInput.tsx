import styled from 'styled-components';

export const RadioInput = styled.input`
  display: none;
  &:checked + .box {
    background-color: #0068ad;
  }
  &:hover + .box {
    box-shadow: 0 0 10px 5px #7cbaeb;
  }
`;
