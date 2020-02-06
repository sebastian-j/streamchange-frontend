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
});
