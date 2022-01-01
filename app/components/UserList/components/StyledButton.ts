import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const StyledButton = styled(Button)`
  span {
    color: ${(props) => props.theme.color};
  }
`;
