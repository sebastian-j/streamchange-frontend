import styled from 'styled-components';

export const UserButton = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.inactiveUser};
  cursor: pointer;
  display: flex;
  line-height: 1.43;
  margin: 12px 5px;
  padding: 0;
  outline: 0;
  &.isEligible {
    color: ${(props) => props.theme.color};
  }
  span {
    font-size: 16px;
    margin-right: 5px;
    vertical-align: middle;
  }
  > svg {
    display: inline-block;
    margin-left: 5px;
    margin-right: 10px;
    height: 1.4em;
    width: 1.1em;
  }
  &:focus-visible {
    outline: 1px solid ${(props) => props.theme.color};
  }
`;
