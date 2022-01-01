import styled from 'styled-components';

const ToolbarButton = styled.button`
  background: ${(props) => props.theme.iconButtonBackground};
  border: none;
  color: ${(props) => props.theme.buttonTextColor};
  border-radius: 50%;
  height: 90%;
  padding: 7px 7px;
  margin: 0 15px 0 0;
  text-decoration: none;
  &:hover {
    background-color: ${(props) => props.theme.buttonBackgroundHover};
    color: ${(props) => props.theme.buttonTextColorHover};
  }
`;

export default ToolbarButton;
