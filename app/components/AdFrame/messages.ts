/*
 * AdFrame Messages
 *
 * This contains all the text for the AdFrame component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'streamchange.components.AdFrame';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Advertisement',
  },
  showMoreBtn: {
    id: `${scope}.showMoreButton`,
    defaultMessage: 'Show the details',
  },
  emptyAdText: {
    id: `${scope}.emptyAdPlaceholder`,
    defaultMessage:
      'This is a place for your advertisement. Prices starts from 10 PLN per day. Your ad will reach thousands of viewers.',
  },
  adDialogTitle: {
    id: `${scope}.dialogTitle`,
    defaultMessage: 'Information for advertisers',
  },
  adDialogFirstLine: {
    id: `${scope}.dialogFirstLine`,
    defaultMessage:
      'There are three possible forms of ad: Youtube channel (clickable logo, title, few sentences), Youtube video (embedded video with some text), clickable banner.',
  },
  adDialogSecondLine: {
    id: `${scope}.dialogSecondLine`,
    defaultMessage:
      'If you chose full version, your ad will be displayed on every stream that will show streamchange app that day. Bank transfer is a preferred payment method.',
  },
  adDialogThirdLine: {
    id: `${scope}.dialogThirdLine`,
    defaultMessage: 'Contact:',
  },
  adDialogCloseBtn: {
    id: `${scope}.dialogCloseButton`,
    defaultMessage: 'Close',
  },
});
