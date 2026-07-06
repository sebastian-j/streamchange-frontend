import styled from 'styled-components';
import Button from '@mui/material/Button';

export const StyledButton = styled(Button)`
  span {
    color: ${(props) => props.theme.materialButtonColor};
    font-size: 1.3rem;
  }
`;
