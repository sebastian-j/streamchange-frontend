import styled from 'styled-components';

export const Row = styled.tr`
  transition: background-color 120ms ease-out;
  &:hover {
    background-color: ${(props) => props.theme.iconButtonBackground};
  }
`;