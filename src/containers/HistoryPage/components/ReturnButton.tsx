import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const ReturnButton = styled(NavLink)`
  display: block;
  color: ${(props) => props.theme.staticTextColor};
  flex-grow: 1;
  line-height: 48px;
  min-height: 48px;
  text-decoration: none;
  & span {
    margin-left: 24px;
  }
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;
