import styled from 'styled-components';

export const Backdrop = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.bodyBackground};
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: fixed;
  height: 100vh;
  width: 100vw;
`;
