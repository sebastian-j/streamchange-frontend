import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { FormattedMessage } from 'react-intl';

import messages from './messages';
import { makeSelectDarkMode } from '../../containers/StyleProvider/selectors';
import { toggleDarkMode } from '../../containers/StyleProvider/actions';

const DarkModeSwitch = (props) => {
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
      <FormattedMessage {...messages.darkModeLabel}>
        {(label) => (
          <FormControlLabel
            control={
              <Switch checked={state} onChange={handleChange} color="primary" />
            }
            label={label}
          />
        )}
      </FormattedMessage>
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
