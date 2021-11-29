/*
 * SupportInformation Messages
 *
 * This contains all the text for the SupportInformation component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'streamchange.components.SupportInformation';

export default defineMessages({
  closeBtn: {
    id: `${scope}.dialogCloseButton`,
    defaultMessage: 'Close',
  },
  dialogTitle: {
    id: `${scope}.dialogTitle`,
    defaultMessage: 'Support and contact information',
  },
  dscDescription: {
    id: `${scope}.discordDescription`,
    defaultMessage:
      'Join StreamChange community on Discord to get notified about latest updates, discuss with other streamers and report bugs in app.',
  },
  discordLink: {
    id: `${scope}.discordLink`,
    defaultMessage: 'Discord',
  },
  fbDescription: {
    id: `${scope}.facebookDescription`,
    defaultMessage:
      'If you have any questions, ask developer on Messenger. Facebook page link is available below.',
  },
  facebookLink: {
    id: `${scope}.facebookLink`,
    defaultMessage: 'StreamChange developer\'s Facebook page',
  },
  toolbarButtonTooltip: {
    id: `${scope}.toolbarButtonTooltip`,
    defaultMessage: 'Get support',
  },
});
