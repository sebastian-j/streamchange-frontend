import styled from 'styled-components';

export const UserBar = styled.div`
  background: linear-gradient(
    to right,
    rgba(230, 150, 230, 0.9) 0%,
    rgba(78, 187, 242, 0.9) 100%
  );
  border: none;
  border-radius: 0 16px 16px 0;
  color: ${(props) => props.theme.inactiveUser};
  line-height: 1.43;
  margin-bottom: 5px;
  max-width: 90%;
  padding: 0;
  outline: 0;
  > div {
    display: flex;
    flex-direction: row;
  }
`;
