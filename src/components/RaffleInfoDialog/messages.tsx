/*
 * RaffleInfoDialog Messages
 *
 * This contains all the text for the RaffleInfoDialog component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'streamchange.components.RaffleInfoDialog';

export default defineMessages({
  trigger: {
    id: `${scope}.trigger`,
    defaultMessage: 'How do the raffle methods work?',
  },
  dialogTitle: {
    id: `${scope}.dialogTitle`,
    defaultMessage: 'How do the raffle methods look?',
  },
  tabReel: {
    id: `${scope}.tab.reel`,
    defaultMessage: 'Reel',
  },
  tabWheel: {
    id: `${scope}.tab.wheel`,
    defaultMessage: 'Fortune wheel',
  },
  reelTagline: {
    id: `${scope}.reel.tagline`,
    defaultMessage: 'Vertical reel in slot-machine style',
  },
  reelDescription: {
    id: `${scope}.reel.description`,
    defaultMessage:
      'Participant names scroll <b>vertically</b> like slot-machine reels and gradually slow down.<br></br>The reel stops on a single participant — that person is the winner. The longer the animation, the longer the slowdown lasts. It works well when you want to build tension linearly, up to the final “stop”.',
  },
  wheelTagline: {
    id: `${scope}.wheel.tagline`,
    defaultMessage: 'Spinning wheel with a segment per participant',
  },
  wheelDescription: {
    id: `${scope}.wheel.description`,
    defaultMessage:
      'Before the draw the system picks up to <b>20 people</b> from all participants and places them on the wheel. Participants are laid out as wheel segments.<br></br>The wheel spins up and then brakes until the pointer stops on one of the slots. The slot marked by the arrow reveals the winner. The animation duration decides how long the wheel spins before stopping. Great when you want a flashy, spinning fortune-wheel draw.',
  },
    tabSlots: {
    id: `${scope}.tab.slots`,
  },
  slotsTagline: {
    id: `${scope}.slots.tagline`,
  },
  slotsDescription: {
    id: `${scope}.slots.description`,
    },
  previewSoon: {
    id: `${scope}.previewSoon`,
    defaultMessage: 'Preview soon',
  },
  previewAlt: {
    id: `${scope}.previewAlt`,
    defaultMessage: 'Preview: {method}',
  },
  closeBtn: {
    id: `${scope}.closeBtn`,
    defaultMessage: 'Close',
  },
});
