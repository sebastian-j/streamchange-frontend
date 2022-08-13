import styled from 'styled-components';

export const SkipListLink = styled.a`
  &:not(:focus-visible) {
    clip: rect(0, 0, 0, 0);
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
  &:focus-visible {
    background: white;
    color: black;
    display: block;
    padding: 2px;
    height: auto;
    width: auto;
    text-decoration: none;
  }
`;
