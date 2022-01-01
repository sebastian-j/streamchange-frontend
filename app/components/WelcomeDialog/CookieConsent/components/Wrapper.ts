import styled from 'styled-components';

export const Wrapper = styled.div`
  align-items: center;
  background: white;
  border-radius: 10px;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.32);
  bottom: 30px;
  display: flex;
  flex-direction: row;
  right: 30px;
  height: 10vh;
  position: fixed;
  transition: opacity 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  @media (orientation: portrait) {
    height: auto;
    right: 2%;
    width: 96%;
  }
`;
