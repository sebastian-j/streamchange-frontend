/*
 *
 * GiveawayPage actions
 *
 */
import { action } from 'typesafe-actions';
import ActionTypes from './constants';
import { Stream } from './types';

export const changeStreamProperties = (stream: Stream) =>
  action(ActionTypes.CHANGE_STREAM_PROPERTIES, stream);
