import React, { useEffect, useState } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const DarkModeSwitch = () => {
  const [state, setState] = useState(false);

  useEffect(() => {
    setState(localStorage.getItem('darkMode') === 'true');
  }, []);

  const handleChange = event => {
    setState(event.target.checked);
    localStorage.setItem('darkMode', event.target.checked.toString());
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Switch checked={state} onChange={handleChange} color="primary" />
        }
        label="Tryb ciemny (widoczny po odświeżeniu strony)"
      />
    </div>
  );
};

export default DarkModeSwitch;
