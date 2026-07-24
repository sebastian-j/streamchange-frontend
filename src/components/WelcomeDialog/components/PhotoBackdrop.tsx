import styled from 'styled-components';
import coverImage from '../assets/background.png';

export const PhotoBackdrop = styled.div`
  background: url(${coverImage}) no-repeat center center fixed;
  background-size: cover;
  position: fixed;
  height: 100vh;
  width: 100vw;
`;
