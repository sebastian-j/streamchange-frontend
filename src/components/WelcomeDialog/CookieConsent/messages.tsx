import { defineMessages } from 'react-intl';

export const scope = 'streamchange.components.WelcomeDialog.CookieConsent';

export default defineMessages({
  cookieInfo: {
    id: `${scope}.info`,
    defaultMessage:
      'This site uses only necessary functional cookies. There is no tracking or personalized ads based on cookies.',
  },
  cookieAcceptButton: {
    id: `${scope}.acceptButton`,
    defaultMessage: 'Accept',
  },
});
