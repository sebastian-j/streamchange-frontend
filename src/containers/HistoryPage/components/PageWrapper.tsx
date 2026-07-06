import styled from 'styled-components';

export const PageWrapper = styled.div`
  background-color: ${(props) => props.theme.bodyBackground};
  padding: 10px;
  overflow-x: hidden;
  min-height: 100vh;
  width: 100%;
`;
