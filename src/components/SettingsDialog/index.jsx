import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { makeSelectColor } from '../../containers/StyleProvider/selectors';
import { changeColor } from '../../containers/StyleProvider/actions';
import SettingsDialog from './SettingsDialogComponent';

const mapStateToProps = createSelector(makeSelectColor(), (themeColor) => ({
  themeColor,
}));

function mapDispatchToProps(dispatch) {
  return {
    onColorChange: (col) => dispatch(changeColor(col)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDialog);
