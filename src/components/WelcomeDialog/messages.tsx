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
  saveBtn: {
    id: `${scope}.saveBtn`,
    defaultMessage: 'OK',
  },
  compatibilityInfo: {
    id: `${scope}.compatibilityInfo`,
    defaultMessage: 'App works only in Google Chrome',
  },
  invalidUrlError: {
    id: `${scope}.error.invalidUrl`,
    defaultMessage: 'This is not a URL to live stream.',
  },
  invalidChannelUrlError: {
    id: `${scope}.error.invalidChannelUrl`,
    defaultMessage:
      'Invalid link. Paste a link in the format twitch.tv/channel or kick.com/channel.',
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
  banDate: {
    id: `${scope}.banDate`,
    defaultMessage: 'Banned to',
  },
  banReason: {
    id: `${scope}.banReason`,
    defaultMessage: 'Reason:',
  },
});
