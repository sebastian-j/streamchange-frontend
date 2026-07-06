import styled from 'styled-components';
import Button from '@mui/material/Button';

export const StyledButton = styled(Button)`
  span {
    color: ${(props) => props.theme.color};
  }
`;
