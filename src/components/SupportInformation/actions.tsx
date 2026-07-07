/*
 *
 * SupportInformation actions
 *
 */
import { action } from 'typesafe-actions';
import ActionTypes from './constants';

export const changeDialogVisibility = (isOpen: boolean) =>
  action(ActionTypes.CHANGE_DIALOG_VISIBILITY, isOpen);
