import styled from 'styled-components';

export const EditModeButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.buttonTextColor};
  cursor: pointer;
  font-weight: bold;
  outline: none;
  &:hover {
    color: ${(props) => props.theme.buttonTextColorHover};
  }
`;
