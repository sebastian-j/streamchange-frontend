import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useIntl } from 'react-intl';

import messages from './messages';
import { makeSelectDarkMode } from '../../containers/StyleProvider/selectors';
import { toggleDarkMode } from '../../containers/StyleProvider/actions';

const DarkModeSwitch = (props) => {
  const intl = useIntl();
  const [state, setState] = useState(false);

  useEffect(() => {
    setState(localStorage.getItem('darkMode') === 'true');
  }, []);

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
        label={intl.formatMessage({...messages.darkModeLabel})}
      />
    </div>
  );
};

DarkModeSwitch.propTypes = {
  onModeToggle: PropTypes.func,
};

const mapStateToProps = createSelector(makeSelectDarkMode(), (isDarkMode) => ({
  isDarkMode,
}));

export function mapDispatchToProps(dispatch) {
  return {
    onModeToggle: (evt) => dispatch(toggleDarkMode(evt.target.checked)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DarkModeSwitch);
