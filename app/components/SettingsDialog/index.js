import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';

import messages from './messages';
import ColorPicker from '../ColorPicker';
import DarkModeSwitch from './DarkModeSwitch';
import LocaleToggle from './LocaleToggle';
import HintParagraph from '../Tooltip/HintParagraph';
import ToolbarButton from '../SupportInformation/ToolbarButton';
import { makeSelectColor } from '../../containers/StyleProvider/selectors';
import { changeColor } from '../../containers/StyleProvider/actions';

const SettingsDialog = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [themeColor, setThemeColor] = useState(props.themeColor);
  const [saveCommands, setSaveCommands] = useState(false);
  const [deleteWinner, setDeleteWinner] = useState(false);
  const [abortCommand, setAbortCommand] = useState('');
  const [error, setError] = useState(null);

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const changeThemeColor = (value) => {
    setThemeColor(value);
  };

  const saveSettings = () => {
    props.onColorChange(themeColor);
    if (localStorage.getItem('keyword') === abortCommand) {
      setError('Komendy na rezygnację i dołączenie muszą być różne.');
      return;
    }
    localStorage.setItem('themeColor', themeColor);
    localStorage.setItem('gv-saveCommands', String(saveCommands));
    localStorage.setItem('gv-deleteWinner', String(deleteWinner));
    localStorage.setItem('gv-abortCommand', String(abortCommand));
    closeDialog();
  };

  useEffect(() => {
    setSaveCommands(localStorage.getItem('gv-saveCommands') === 'true');
    setDeleteWinner(localStorage.getItem('gv-deleteWinner') === 'true');
    setAbortCommand(localStorage.getItem('gv-abortCommand'));
    setThemeColor(localStorage.getItem('themeColor') || '#0094ff');
  }, []);

  return (
    <div style={{ display: 'inline-block' }}>
      <Tooltip
        title={
          <HintParagraph>
            <FormattedMessage {...messages.dialogTitle} />
          </HintParagraph>
        }
      >
        <ToolbarButton onClick={openDialog} type="button">
          <span className="border border-initial" />
          <svg className="border border-hover" fill="none">
            <circle cx="50%" cy="50%" r="32.5" pathLength="1"/>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
          </svg>
        </ToolbarButton>
      </Tooltip>
      <Dialog
        open={isOpen}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <FormattedMessage {...messages.dialogTitle} />
        </DialogTitle>
        <DialogContent>
          <DarkModeSwitch />
          <FormattedMessage {...messages.themeColor}>
            {(label) => (
              <ColorPicker
                color={themeColor}
                handleChange={(name, value) => changeThemeColor(value)}
                label={label}
                name="themeColor"
              />
            )}
          </FormattedMessage>
          <LocaleToggle />
          <div>
            <FormattedMessage {...messages.saveCommandsLabel}>
              {(label) => (
                <Tooltip
                  title={
                    <HintParagraph>
                      <FormattedMessage {...messages.saveCommandsHint} />
                    </HintParagraph>
                  }
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={saveCommands}
                        onChange={(event) =>
                          setSaveCommands(event.target.checked)
                        }
                        color="primary"
                        name="saveCommands"
                        type="checkbox"
                      />
                    }
                    label={label}
                  />
                </Tooltip>
              )}
            </FormattedMessage>
          </div>
          <FormattedMessage {...messages.deleteWinnerLabel}>
            {(label) => (
              <Tooltip
                title={
                  <HintParagraph>
                    <FormattedMessage {...messages.deleteWinnerHint} />
                  </HintParagraph>
                }
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={deleteWinner}
                      onChange={(event) =>
                        setDeleteWinner(event.target.checked)
                      }
                      color="primary"
                      name="deleteWinner"
                      type="checkbox"
                    />
                  }
                  label={label}
                />
              </Tooltip>
            )}
          </FormattedMessage>
          <FormattedMessage {...messages.resignationCommand}>
            {(label) => (
              <TextField
                error={!!error}
                id="abortCommand"
                name="abortCommand"
                label={label}
                value={abortCommand}
                variant="standard"
                onChange={(event) => {
                  setAbortCommand(event.target.value);
                  setError(null);
                }}
                fullWidth
                margin="normal"
                helperText={error}
              />
            )}
          </FormattedMessage>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="secondary">
            <FormattedMessage {...messages.cancelBtn} />
          </Button>
          <Button onClick={saveSettings} color="primary">
            <FormattedMessage {...messages.saveBtn} />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

SettingsDialog.propTypes = {
  onColorChange: PropTypes.func,
  themeColor: PropTypes.string,
};

const mapStateToProps = createSelector(makeSelectColor(), (themeColor) => ({
  themeColor,
}));

export function mapDispatchToProps(dispatch) {
  return {
    onColorChange: (col) => dispatch(changeColor(col)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsDialog);
