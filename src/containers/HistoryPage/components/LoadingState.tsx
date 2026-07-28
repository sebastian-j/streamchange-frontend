import styled from 'styled-components';

export const LoadingState = styled.div`
  align-items: center;
  color: ${(props) => props.theme.staticTextColor};
  display: flex;
  flex-direction: column;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 1.1rem;
  gap: 16px;
  margin-top: 15vh;
  text-align: center;
`;
