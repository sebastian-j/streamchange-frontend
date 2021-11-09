/*
 *
 * SupportInformation actions
 *
 */

import { CHANGE_DIALOG_VISIBILITY } from './constants';

export function changeDialogVisibility(isOpen) {
  return {
    type: CHANGE_DIALOG_VISIBILITY,
    isOpen,
  };
}
