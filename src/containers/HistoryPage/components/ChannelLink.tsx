import styled from 'styled-components';

export const ChannelLink = styled.a`
  align-items: center;
  color: ${(props) => props.theme.staticTextColor};
  display: inline-flex;
  gap: 12px;
  text-decoration: none;
  &:hover span {
    text-decoration: underline;
  }
`;