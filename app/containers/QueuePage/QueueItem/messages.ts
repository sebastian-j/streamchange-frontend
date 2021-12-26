import { defineMessages } from 'react-intl';

export const scope = 'streamchange.containers.QueuePage.QueueItem';

export default defineMessages({
  addedAtTooltipField: {
    id: `${scope}.addedAt`,
    defaultMessage: 'Joined at',
  },
  activeAtTooltipField: {
    id: `${scope}.activeAt`,
    defaultMessage: 'Last message at',
  },
  saveBtn: {
    id: `${scope}.save`,
    defaultMessage: 'Save',
  },
  cancelBtn: {
    id: `${scope}.quitEditMode`,
    defaultMessage: 'Cancel',
  },
  markActiveBtn: {
    id: `${scope}.markAsActive`,
    defaultMessage: 'Mark as active',
  },
});
