import { useState } from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useIntl } from 'react-intl';

import messages from './messages';

const DarkModeSwitch = (props) => {
  const intl = useIntl();
  const [state, setState] = useState(
    () => localStorage.getItem('darkMode') === 'true'
  );

  const handleChange = (event) => {
    setState(event.target.checked);
    localStorage.setItem('darkMode', event.target.checked.toString());
    props.onModeToggle(event);
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Switch checked={state} onChange={handleChange} color="primary" />
        }
        label={intl.formatMessage({ ...messages.darkModeLabel })}
      />
    </div>
  );
};

DarkModeSwitch.propTypes = {
  onModeToggle: PropTypes.func,
};

export default DarkModeSwitch;
