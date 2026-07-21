import styled from 'styled-components';
import coverImage from '../assets/background.png';

export const PhotoBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  background-image: url(${coverImage});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
`;
