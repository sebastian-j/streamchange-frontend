import kickBroadcaster from './assets/badges/kick/kick_broadcaster_badge.svg';
import kickModerator from './assets/badges/kick/kick_moderator_badge.svg';
import kickVip from './assets/badges/kick/kick_vip_badge.svg';
import kickSubscriber from './assets/badges/kick/kick_subscriber_default_badge.svg';
import kickFounder from './assets/badges/kick/kick_founder_badge.svg';
import kickCertified from './assets/badges/kick/kick_verified_badge.svg';
import kickOg from './assets/badges/kick/kick_og_badge.svg';
import kickBot from './assets/badges/kick/kick_bot_badge.svg';

import twitchBroadcaster from './assets/badges/twitch/twitch_broadcaster_badge.svg';
import twitchModerator from './assets/badges/twitch/twitch_moderator_badge.svg';
import twitchVip from './assets/badges/twitch/twitch_vip_badge.svg';
import twitchSubscriber from './assets/badges/twitch/twitch_subscriber_badge.svg';
import twitchFounder from './assets/badges/twitch/twitch_founder_badge.svg';
import twitchCertified from './assets/badges/twitch/twitch_verified_badge.svg';

// Badges are rendered left-to-right in this order, like on Twitch/Kick
export const BADGE_ORDER = [
  { key: 'broadcaster', label: 'Broadcaster' },
  { key: 'moderator', label: 'Moderator' },
  { key: 'vip', label: 'VIP' },
  { key: 'founder', label: 'Founder' },
  { key: 'subscriber', label: 'Subscriber' },
  { key: 'certified', label: 'Certified' },
  { key: 'og', label: 'OG' },
  { key: 'bot', label: 'Bot' },
];

// Maps the canonical badge names sent by the backend to the platform icons.
// The "certified" rank (Twitch partner / Kick verified) reuses the verified svg.
export const BADGE_SETS = {
  kick: {
    broadcaster: kickBroadcaster,
    moderator: kickModerator,
    vip: kickVip,
    subscriber: kickSubscriber,
    founder: kickFounder,
    certified: kickCertified,
    og: kickOg,
    bot: kickBot,
  },
  twitch: {
    broadcaster: twitchBroadcaster,
    moderator: twitchModerator,
    vip: twitchVip,
    subscriber: twitchSubscriber,
    founder: twitchFounder,
    certified: twitchCertified,
  },
};
