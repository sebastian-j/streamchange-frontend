import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import DarkModeSwitch from './DarkModeSwitch';

const SettingsButton = styled.button`
  background: ${props => props.theme.buttonBackground};
  border: 1px solid #0059a3;
  color: ${props => props.theme.buttonTextColor};
  border-radius: 4px;
  height: 80%;
  padding: 3px 5px;
  margin: 10px 15px 0 0;
  text-decoration: none;
  &:hover {
    background-color: ${props => props.theme.buttonBackgroundHover};
    color: ${props => props.theme.buttonTextColorHover};
  }
`;

const HintParagraph = styled.span`
  font-size: 0.9rem;
  line-height: 1.1rem;
  display: block;
`;

const SettingsDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const saveSettings = () => {
    if (localStorage.getItem('keyword') === abortCommand) {
      setError('Komendy na rezygnację i dołączenie muszą być różne.');
      return;
    }
    localStorage.setItem('gv-saveCommands', String(saveCommands));
    localStorage.setItem('gv-deleteWinner', String(deleteWinner));
    localStorage.setItem('gv-abortCommand', String(abortCommand));
    closeDialog();
  };

  useEffect(() => {
    setSaveCommands(localStorage.getItem('gv-saveCommands') === 'true');
    setDeleteWinner(localStorage.getItem('gv-deleteWinner') === 'true');
    setAbortCommand(localStorage.getItem('gv-abortCommand'));
  }, []);

  return (
    <div style={{ display: 'inline-block' }}>
      <SettingsButton onClick={openDialog} type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
        </svg>
      </SettingsButton>
      <Dialog
        open={isOpen}
        onClose={closeDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Ustawienia</DialogTitle>
        <DialogContent>
          <DarkModeSwitch />
          <Tooltip
            title={
              <HintParagraph>
                Gdy zaznaczone, w widoku czatu zwycięzcy będą wyświetlane
                wszystkie wysłane przez niego komendy na dołączenie. Może to być
                spam setek identycznych wiadomości, dlatego zazwyczaj lepiej
                zostawić pole niezaznaczone.
              </HintParagraph>
            }
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={saveCommands}
                  onChange={event => setSaveCommands(event.target.checked)}
                  color="primary"
                  name="saveCommands"
                  type="checkbox"
                />
              }
              label="Zapisuj wysłane komendy na dołączenie"
            />
          </Tooltip>
          <Tooltip
            title={
              <HintParagraph>
                Osoba, która wygrała losowanie, nie bierze udziału w kolejnym.
              </HintParagraph>
            }
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={deleteWinner}
                  onChange={event => setDeleteWinner(event.target.checked)}
                  color="primary"
                  name="deleteWinner"
                  type="checkbox"
                />
              }
              label="Usuń z listy zwycięzcę losowania"
            />
          </Tooltip>
          <TextField
            error={!!error}
            id="abortCommand"
            name="abortCommand"
            label="Komenda na rezygnację z losowania"
            value={abortCommand}
            onChange={event => {
              setAbortCommand(event.target.value);
              setError(null);
            }}
            fullWidth
            margin="normal"
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="secondary">
            Anuluj
          </Button>
          <Button onClick={saveSettings} color="primary">
            Zapisz
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default SettingsDialog;