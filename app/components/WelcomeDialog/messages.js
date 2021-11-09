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
  banDate: {
    id: `${scope}.banDate`,
    defaultMessage: 'Banned to',
  },
  banReason: {
    id: `${scope}.banReason`,
    defaultMessage: 'Reason:',
  },
  holiday1402: {
    id: `${scope}.holidays.14-02`,
    defaultMessage: "February 14 - Valetine's Day",
  },
  holiday1403: {
    id: `${scope}.holidays.14-03`,
    defaultMessage: 'March 14 - Pi Day',
  },
  holiday2004: {
    id: `${scope}.holiday.20-04`,
    defaultMessage: 'April 20 - Cannabis Day',
  },
  holiday1705: {
    id: `${scope}.holiday.17-05`,
    defaultMessage:
      'May 17 - International Day Against Homophobia, Biphobia and Transphobia',
  },
  holidayJune: {
    id: `${scope}.holiday.x-06`,
    defaultMessage: 'June - Pride Month',
  },
  holiday2608: {
    id: `${scope}.holiday.26-08`,
    defaultMessage: 'August 26 - International Dog Day',
  },
  holiday2309: {
    id: `${scope}.holiday.23-09`,
    defaultMessage: 'First Day of Fall',
  },
  holiday0110: {
    id: `${scope}.holiday.01-10`,
    defaultMessage: 'October 1 - World Vegetarian Day',
  },
  holiday1110: {
    id: `${scope}.holiday.11-10`,
    defaultMessage: 'October 11 - Coming Out Day',
  },
  holiday3110: {
    id: `${scope}.holiday.31-10`,
    defaultMessage: 'October 31 - Halloween',
  },
  holiday0612: {
    id: `${scope}.holiday.06-12`,
    defaultMessage: 'December 6 - Santa Claus',
  },
  holiday2512: {
    id: `${scope}.holiday.25-12`,
    defaultMessage: 'December 25, 26 - Christmas',
  },
  holiday3112: {
    id: `${scope}.holiday.31-12`,
    defaultMessage: "December 31 - New Year's Eve",
  },
  cookieInfo: {
    id: `${scope}.CookieConsent.info`,
    defaultMessage:
      'This site uses only necessary functional cookies. There is no tracking or personalized ads based on cookies.',
  },
  cookieAcceptButton: {
    id: `${scope}.CookieConsent.acceptButton`,
    defaultMessage: 'Accept',
  },
  firstUseSaveBtn: {
    id: `${scope}.FirstUseScreen.saveBtn`,
    defaultMessage: 'Save',
  },
  firstUseSelectLang: {
    id: `${scope}.FirstUseScreen.selectLanguage`,
    defaultMessage: 'Select language',
  },
  firstUseSelectTheme: {
    id: `${scope}.FirstUseScreen.selectTheme`,
    defaultMessage: 'Select theme',
  },
  darkTheme: {
    id: `${scope}.FirstUseScreen.theme.dark`,
    defaultMessage: 'Dark',
  },
  lightTheme: {
    id: `${scope}.FirstUseScreen.theme.light`,
    defaultMessage: 'Light',
  },
  firstUseTitle: {
    id: `${scope}.FirstUseScreen.title`,
    defaultMessage: 'Welcome to StreamChange',
  },
  en: {
    id: `streamchange.components.SettingsDialog.LocaleToggle.en`,
    defaultMessage: 'en',
  },
  pl: {
    id: `streamchange.components.SettingsDialog.LocaleToggle.pl`,
    defaultMessage: 'pl',
  },
});
