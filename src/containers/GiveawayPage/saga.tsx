import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import qs from 'qs';

import ActionTypes from './constants';
import { request } from 'utils/request';
import { changeBanStatus, loadAuthKey } from './actions';
import { makeSelectStreamInfo } from './selectors';
import { Stream } from './types';
import { API_URL } from '../../config';

/**
 *  Selects streamInfo from store, then adds part to the request
 */
export function* sendTelemetry() {
  const streamInfo = yield select(makeSelectStreamInfo());
  streamInfo.part = 'stream';
  const requestURL = `${API_URL}/v4/telemetry`;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify(streamInfo),
  };

  try {
    const res = yield call(request, requestURL, requestOptions);
    yield put(loadAuthKey(res.status));
  } catch (err) {
    yield put(loadAuthKey(''));
  }
}

/**
 *  Selects streamInfo from store, then checks if ownerId is present on a ban list
 */
export function* checkBan() {
  const streamInfo: Stream = yield select(makeSelectStreamInfo());
  const requestURL = '../static/bans.json';

  try {
    const { items } = yield call(request, requestURL);
    for (let i = 0; i < items.length; i += 1) {
      if (
        items[i].channelId === streamInfo.ownerId &&
        new Date(items[i].endsAt) > new Date()
      ) {
        yield put(changeBanStatus(items[i]));
        return;
      }
    }
    yield put(changeBanStatus(null));
  } catch (err) {
    yield put(changeBanStatus(null));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* githubData() {
  yield all([
    takeLatest(ActionTypes.CHANGE_STREAM_PROPERTIES, checkBan),
    takeLatest(ActionTypes.SEND_TELEMETRY_DATA, sendTelemetry),
  ]);
}
