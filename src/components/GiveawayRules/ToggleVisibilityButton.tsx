import styled from 'styled-components';

const ToggleVisibilityBtn = styled.button`
  background-color: transparent;
  border: none;
  color: ${(props) => props.theme.staticTextColor};
  outline: none;
  &:hover {
    color: ${(props) => props.theme.color};
  }
  & * {
    pointer-events: none;
  }
`;

export default ToggleVisibilityBtn;
