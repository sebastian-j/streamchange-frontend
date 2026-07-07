import styled from 'styled-components';
import TextField from '@mui/material/TextField';

const StyledTextField = styled(TextField)`
  /* stylelint-disable property-no-vendor-prefix */
  input {
    color: ${(props) => props.theme.staticTextColor};
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
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
