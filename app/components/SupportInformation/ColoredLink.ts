import styled from 'styled-components';

const ColoredLink = styled.a`
  color: ${(props) => props.theme.color};
  display: block;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: 500;
  height: 20px;
  padding: 5px 0;
  text-decoration: none;
  text-transform: uppercase;
  span {
    padding: 0 8px 0 0;
  }
  svg {
    height: 24px;
    width: 24px;
  }
`;

export default ColoredLink;
