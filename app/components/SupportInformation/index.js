import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';

import messages from './messages';
import ColoredLink from './ColoredLink';
import HintParagraph from '../Tooltip/HintParagraph';
import ToolbarButton from './ToolbarButton';
import { useInjectReducer } from '../../utils/injectReducer';
import { makeSelectDialogVisibility } from './selectors';
import reducer from './reducer';
import { changeDialogVisibility } from './actions';

export const SupportInformation = (props) => {
  useInjectReducer({ key: 'supportInfo', reducer });

  return (
    <div style={{ display: 'inline-block' }}>
      <Tooltip
        title={
          <HintParagraph>
            <FormattedMessage {...messages.toolbarButtonTooltip} />
          </HintParagraph>
        }
      >
        <ToolbarButton onClick={props.openDialog} type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
          </svg>
        </ToolbarButton>
      </Tooltip>
      <Dialog
        open={props.isOpen}
        onClose={props.closeDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <FormattedMessage {...messages.dialogTitle} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <FormattedMessage {...messages.fbDescription} />
            <ColoredLink href="https://www.facebook.com/BafYT/" target="_blank">
              <FormattedMessage {...messages.facebookLink} />
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
              >
                <g>
                  <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                </g>
              </svg>
            </ColoredLink>
          </DialogContentText>
          <DialogContentText>
            <FormattedMessage {...messages.dscDescription} />
            <ColoredLink href="https://discord.gg/SykDSs9S4H" target="_blank">
              <FormattedMessage {...messages.discordLink} />
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
              >
                <g>
                  <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z" />
                </g>
              </svg>
            </ColoredLink>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.closeDialog} color="secondary">
            <FormattedMessage {...messages.closeBtn} />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

SupportInformation.propTypes = {
  closeDialog: PropTypes.func,
  isOpen: PropTypes.bool,
  openDialog: PropTypes.func,
};

const mapStateToProps = createSelector(
  makeSelectDialogVisibility(),
  (isOpen) => ({
    isOpen,
  }),
);

export function mapDispatchToProps(dispatch) {
  return {
    closeDialog: () => dispatch(changeDialogVisibility(false)),
    openDialog: () => dispatch(changeDialogVisibility(true)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SupportInformation);
