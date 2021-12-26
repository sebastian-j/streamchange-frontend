import styled from 'styled-components';

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.color};
  cursor: pointer;
  outline: none;
  &:hover {
    color: ${(props) => props.theme.buttonTextColorHover};
  }
`;
