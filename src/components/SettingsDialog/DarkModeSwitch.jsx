import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { makeSelectDarkMode } from '../../containers/StyleProvider/selectors';
import { toggleDarkMode } from '../../containers/StyleProvider/actions';
import DarkModeSwitch from './DarkModeSwitchComponent';

const mapStateToProps = createSelector(makeSelectDarkMode(), (isDarkMode) => ({
  isDarkMode,
}));

function mapDispatchToProps(dispatch) {
  return {
    onModeToggle: (evt) => dispatch(toggleDarkMode(evt.target.checked)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DarkModeSwitch);
