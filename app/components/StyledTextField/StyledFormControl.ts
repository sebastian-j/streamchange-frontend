import styled from 'styled-components';
import FormControl from '@mui/material/FormControl';

const StyledFormControl = styled(FormControl)`
  width: 100%;
  input {
    color: ${(props) => props.theme.staticTextColor};
  }
  svg {
    color: ${(props) => props.theme.staticTextColor};
  }
  label {
    left: -12px;
    color: ${(props) => props.theme.inputLabel};
  }
  label.Mui-focused span {
    color: ${(props) => props.theme.color};
  }
  .MuiInput-input {
    color: ${(props) => props.theme.staticTextColor};
  }
  .MuiInput-underline:hover:not(.Mui-disabled):before {
    border-bottom: 2px solid ${(props) => props.theme.color};
  }
  .MuiInput-underline:after {
    border-bottom: 2px solid ${(props) => props.theme.color};
  }
`;

export default StyledFormControl;
