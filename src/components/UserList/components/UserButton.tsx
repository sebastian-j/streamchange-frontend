import styled from 'styled-components';

export const UserButton = styled.button<{ $userColor?: string }>`
  background: none;
  border: none;
  border-radius: 6px;
  color: ${(props) => props.$userColor || props.theme.inactiveUser};
  cursor: pointer;
  display: flex;
  align-items: center;
  line-height: 1.43;
  margin: 4px 0;
  padding: 6px 8px;
  outline: 0;
  width: 100%;
  min-width: 0;
  text-align: left;
  transition: background-color 100ms ease-out 0ms;
  &:hover {
    background-color: ${(props) => props.theme.iconButtonBackground};
  }
  &.isEligible {
    -webkit-text-stroke: 0.35px black;
    background-color: ${(props) =>
      `color-mix(in srgb, ${props.theme.color} 18%, transparent)`};
  }
  &.isEligible:hover {
    background-color: ${(props) =>
      `color-mix(in srgb, ${props.theme.color} 30%, transparent)`};
  }
  span {
    flex: 1 1 auto;
    min-width: 0;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: middle;
  }
  &:focus-visible {
    outline: 1px solid ${(props) => props.theme.color};
  }
`;
