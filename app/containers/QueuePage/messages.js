/*
 * QueuePage Messages
 *
 * This contains all the text for the QueuePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'streamchange.containers.QueuePage';

export default defineMessages({
  leaveStreamBtn: {
    id: `streamchange.containers.HomePage.leaveStreamBtn`,
    defaultMessage: 'Leave stream',
  },
  panelTitle: {
    id: `${scope}.QueueColumn.title`,
    defaultMessage: 'Queue',
  },
  searchPlaceholder: {
    id: `streamchange.components.UserList.search.placeholder`,
    defaultMessage: 'Search',
  },
  clearBtn: {
    id: `streamchange.components.UserList.clearBtn`,
    defaultMessage: 'Clear all',
  },
  rulesPanelTitle: {
    id: `${scope}.QueueRules.panelTitle`,
    defaultMessage: 'Queue rules',
  },
  commandTextField: {
    id: `${scope}.QueueRules.command`,
    defaultMessage: 'Command for joining the queue',
  },
  capacityTextField: {
    id: `${scope}.QueueRules.capacity`,
    defaultMessage: 'Queue capacity',
  },
  timeToIdleTextField: {
    id: `${scope}.QueueRules.timeToIdle`,
    defaultMessage: 'Time without any message to mark as inactive (sec)',
  },
  timeToKickTextField: {
    id: `${scope}.QueueRules.timeToKick`,
    defaultMessage: 'Time without any message to kick (sec)',
  },
  addedAtTooltipField: {
    id: `${scope}.QueueItem.addedAt`,
    defaultMessage: 'Joined at',
  },
  activeAtTooltipField: {
    id: `${scope}.QueueItem.activeAt`,
    defaultMessage: 'Last message at',
  },
  saveBtn: {
    id: `${scope}.QueueItem.save`,
    defaultMessage: 'Save',
  },
  cancelBtn: {
    id: `${scope}.QueueItem.quitEditMode`,
    defaultMessage: 'Cancel',
  },
  markActiveBtn: {
    id: `${scope}.QueueItem.markAsActive`,
    defaultMessage: 'Mark as active',
  },
});
