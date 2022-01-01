/*
 * ChatEmbed Messages
 *
 * This contains all the text for the ChatEmbed component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'streamchange.components.ChatView';

export default defineMessages({
  panelTitle: {
    id: `${scope}.title`,
    defaultMessage: 'Chat',
  },
  embedMode: {
    id: `${scope}.embedMode`,
    defaultMessage: 'Embedded chat from Youtube',
  },
  internalMode: {
    id: `${scope}.internalMode`,
    defaultMessage: 'Internal StreamChange chat',
  },
});
