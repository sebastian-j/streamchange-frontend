import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const StyledTextField = styled(TextField)`
  input {
    color: ${(props) => props.theme.staticTextColor};
  }
  label {
    color: ${(props) => props.theme.inputLabel};
  }
  label.Mui-focused {
    color: ${(props) => props.theme.color};
  }
  .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: 2px solid ${(props) => props.theme.color};
  }
  .MuiInput-underline:after {
    border-bottom: 2px solid ${(props) => props.theme.color};
  }
`;

export default StyledTextField;
