import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { makeSelectDialogVisibility } from './selectors';
import { changeDialogVisibility } from './actions';
import SupportInformation from './SupportInformationComponent';

const mapStateToProps = createSelector(
  makeSelectDialogVisibility(),
  (isOpen) => ({
    isOpen,
  })
);

export function mapDispatchToProps(dispatch) {
  return {
    closeDialog: () => dispatch(changeDialogVisibility(false)),
    openDialog: () => dispatch(changeDialogVisibility(true)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SupportInformation);
