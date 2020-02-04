import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const StyledTextField = styled(TextField)`
  input {
    color: ${props => props.theme.staticTextColor};
  }
  label {
    color: ${props => props.theme.inputLabel};
  }
  label.Mui-focused {
    color: ${props => props.theme.inputLabelFocused};
  }
`;

export default StyledTextField;
