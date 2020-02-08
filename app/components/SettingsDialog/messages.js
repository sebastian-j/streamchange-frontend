/*
 * SettingsDialog Messages
 *
 * This contains all the text for the SettingsDialog component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'streamchange.components.SettingsDialog';

export default defineMessages({
  en: {
    id: `${scope}.LocaleToggle.en`,
    defaultMessage: 'en',
  },
  pl: {
    id: `${scope}.LocaleToggle.pl`,
    defaultMessage: 'pl',
  },
  localeTitle: {
    id: `${scope}.LocaleToggle.title`,
    defaultMessage: 'Language',
  },
  darkModeLabel: {
    id: `${scope}.DarkModeSwitch.label`,
    defaultMessage: 'Dark mode (visible after page refresh)',
  },
  dialogTitle: {
    id: `${scope}.DialogTitle`,
    defaultMessage: 'Settings',
  },
  deleteWinnerHint: {
    id: `${scope}.DeleteWinner.hint`,
    defaultMessage: 'The winner does not take part in the next draw.',
  },
  deleteWinnerLabel: {
    id: `${scope}.DeleteWinner.label`,
    defaultMessage: 'The winner does not take part in the next draw.',
  },
  resignationCommand: {
    id: `${scope}.ResignationCommand.label`,
    defaultMessage: 'Resignation command',
  },
  saveCommandsLabel: {
    id: `${scope}.SaveCommands.label`,
    defaultMessage: 'Save commands in the chat log',
  },
  saveCommandsHint: {
    id: `${scope}.SaveCommands.hint`,
    defaultMessage:
      "If checked, winner chat log will show all sent commands. They can be hundreds of identical messages, so usually it's better to uncheck this setting.",
  },
  saveBtn: {
    id: `${scope}.SaveButton`,
    defaultMessage: 'Save',
  },
  cancelBtn: {
    id: `${scope}.CancelButton`,
    defaultMessage: 'Cancel',
  },
});
