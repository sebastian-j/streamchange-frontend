import { defineMessages } from 'react-intl';

export const scope = 'streamchange.components.NumericInput';

export default defineMessages({
  decreaseButton: {
    id: `${scope}.decrease`,
    defaultMessage: 'Decrease by one',
  },
  increaseButton: {
    id: `${scope}.increase`,
    defaultMessage: 'Increase by one',
  },
});
