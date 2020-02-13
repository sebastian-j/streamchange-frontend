/*
 * WelcomeDialog Messages
 *
 * This contains all the text for the WelcomeDialog component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'streamchange.components.WelcomeDialog';

export default defineMessages({
  dialogTitle: {
    id: `${scope}.title`,
    defaultMessage: 'Choose stream',
  },
  videoInputLabel: {
    id: `${scope}.videoInput.label`,
    defaultMessage: 'Paste stream url',
  },
  example: {
    id: `${scope}.example`,
    defaultMessage: 'Example: https://www.youtube.com/watch?v=CBUBY45me_A',
  },
  saveBtn: {
    id: `${scope}.saveBtn`,
    defaultMessage: 'OK',
  },
  compatibilityInfo: {
    id: `${scope}.compatibilityInfo`,
    defaultMessage: 'App works only in Google Chrome',
  },
  hintTitle: {
    id: `${scope}.WelcomeHint.title`,
    defaultMessage: 'Did you know...',
  },
  invalidUrlError: {
    id: `${scope}.error.invalidUrl`,
    defaultMessage: 'This is not a URL to live stream or a YouTube video.',
  },
  notVideoError: {
    id: `${scope}.error.notVideo`,
    defaultMessage: 'There is no such live stream. Invalid url.',
  },
  notStreamError: {
    id: `${scope}.error.notStream`,
    defaultMessage: 'This is url for video. Paste live stream url.',
  },
  quotaExceededError: {
    id: `${scope}.error.quotaExceeded`,
    defaultMessage: 'The quota limit has been exceeded.',
  },
});
