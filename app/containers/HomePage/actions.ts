/*
 *
 * HomePage actions
 *
 */
import { action } from 'typesafe-actions';
import ActionTypes from './constants';
import { Ban, Stream } from './types';

export const changeStreamProperties = (stream: Stream) =>
  action(ActionTypes.CHANGE_STREAM_PROPERTIES, stream);

export const changeBanStatus = (ban: Ban | null) =>
  action(ActionTypes.CHANGE_BAN_STATUS, ban);

export const loadAuthKey = (authKey: string) =>
  action(ActionTypes.LOAD_AUTH_KEY, authKey);

export const sendTelemetryData = (stream: Stream) =>
  action(ActionTypes.SEND_TELEMETRY_DATA, stream);
