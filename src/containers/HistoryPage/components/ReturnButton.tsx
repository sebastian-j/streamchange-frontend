import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const ReturnButton = styled(NavLink)`
  align-items: center;
  color: ${(props) => props.theme.staticTextColor};
  display: inline-flex;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 0.95rem;
  gap: 8px;
  padding: 10px 18px;
  text-decoration: none;
  transition: background-color 120ms ease-out;
  &:hover {
    background-color: ${(props) => props.theme.iconButtonBackground};
  }
`;
