import { defineMessages } from 'react-intl';

export const scope = 'streamchange.components.WelcomeDialog.FirstUseScreen';

export default defineMessages({
  firstUseSaveBtn: {
    id: `${scope}.saveBtn`,
    defaultMessage: 'Save',
  },
  firstUseSelectLang: {
    id: `${scope}.selectLanguage`,
    defaultMessage: 'Select language',
  },
  firstUseSelectTheme: {
    id: `${scope}.selectTheme`,
    defaultMessage: 'Select theme',
  },
  darkTheme: {
    id: `${scope}.theme.dark`,
    defaultMessage: 'Dark',
  },
  lightTheme: {
    id: `${scope}.theme.light`,
    defaultMessage: 'Light',
  },
  firstUseTitle: {
    id: `${scope}.title`,
    defaultMessage: 'Welcome to StreamChange',
  },
  en: {
    id: 'streamchange.components.SettingsDialog.LocaleToggle.en',
    defaultMessage: 'en',
  },
  pl: {
    id: 'streamchange.components.SettingsDialog.LocaleToggle.pl',
    defaultMessage: 'pl',
  },
});
