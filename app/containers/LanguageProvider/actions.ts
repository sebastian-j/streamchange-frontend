/*
 *
 * LanguageProvider actions
 *
 */

import { action } from 'typesafe-actions';
import ActionTypes from './constants';

export const changeLocale = (locale: string) =>
  action(ActionTypes.CHANGE_LOCALE, locale);

