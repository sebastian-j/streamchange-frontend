import { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useIntl } from 'react-intl';

import messages from './messages';

const DarkModeSwitch = (onModeToggle: (event: React.ChangeEvent<HTMLInputElement>) => void) => {
  const intl = useIntl();
  const [state, setState] = useState(
    () => localStorage.getItem('darkMode') === 'true'
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.checked);
    localStorage.setItem('darkMode', event.target.checked.toString());
    onModeToggle(event);
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

export default DarkModeSwitch;
