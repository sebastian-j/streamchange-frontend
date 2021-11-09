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
  commandTextFieldLabel: {
    id: `${scope}.QueueRules.command.label`,
    defaultMessage: 'Command for joining the queue',
  },
  commandTextFieldTooltip: {
    id: `${scope}.QueueRules.command.tooltip`,
    defaultMessage:
      'A viewer have to send this command in a chat message to join the queue',
  },
  capacityTextFieldLabel: {
    id: `${scope}.QueueRules.capacity.label`,
    defaultMessage: 'Queue capacity',
  },
  capacityTextFieldTooltip1: {
    id: `${scope}.QueueRules.capacity.tooltip.1`,
    defaultMessage:
      'Decide how many viewers can wait in the queue in the same time.',
  },
  capacityTextFieldTooltip2: {
    id: `${scope}.QueueRules.capacity.tooltip.2`,
    defaultMessage:
      'If more viewers try to join the queue, they will be rejected automatically.',
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
  widgetCodeTextField: {
    id: `${scope}.QueueRules.widgetCodeTextField`,
    defaultMessage: 'Code for OBS widget with queue',
  },
  widgetDialogTitle: {
    id: `${scope}.QueueWidgetDialog.title`,
    defaultMessage: 'Queue widget for OBS',
  },
  widgetDialogFirstLine: {
    id: `${scope}.QueueWidgetDialog.firstLine`,
    defaultMessage:
      'Your widget url is created from your private widget code. Do not share your code with anyone. Everyone with your private code can add, edit and delete channels stored in your queue. As code cannot be restored from widget url, you can securely share the url with your audience.',
  },
  widgetDialogSecondLine: {
    id: `${scope}.QueueWidgetDialog.secondLine`,
    defaultMessage: 'Paste this url to embedded browser in OBS',
  },
  widgetDialogCopyBtn: {
    id: `${scope}.QueueWidgetDialog.copyButton`,
    defaultMessage: 'Copy',
  },
});
