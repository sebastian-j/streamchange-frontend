/*
 * RelativeDate Messages
 *
 * This contains all the text for the RelativeDate component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'streamchange.components.RelativeDate';

export default defineMessages({
  beforeYesterday: {
    id: `${scope}.beforeYesterday`,
    defaultMessage: 'Two days ago',
  },
  fewMinutesAgo: {
    id: `${scope}.fewMinutesAgo`,
    defaultMessage: '{value} minutes ago',
  },
  justNow: {
    id: `${scope}.justNow`,
    defaultMessage: 'Just now',
  },
  minuteAgo: {
    id: `${scope}.minuteAgo`,
    defaultMessage: 'Minute ago',
  },
  minutesAgo: {
    id: `${scope}.minutesAgo`,
    defaultMessage: '{value} minutes ago',
  },
  never: {
    id: `${scope}.never`,
    defaultMessage: 'Never',
  },
  secondsAgo: {
    id: `${scope}.secondsAgo`,
    defaultMessage: '{value} seconds ago',
  },
  today: {
    id: `${scope}.today`,
    defaultMessage: 'Today',
  },
  yesterday: {
    id: `${scope}.yesterday`,
    defaultMessage: 'Yesterday',
  },
});
