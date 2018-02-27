import { takeLatest, put, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { push } from 'react-router-redux';

// Actions
import {
  CREATE_PLAYER,
  createPlayerSuccess,
  CREATE_SESSION_REQUEST,
  createSessionSuccess,
  FETCH_SESSION,
  fetchSessionSuccess,
} from './actions';

import { showToast, hideToast } from '../Toast/actions';

// Selectors
import { realmSelector } from '../Login/selectors';

// Api
import { createPlayer, createSession, fetchSession } from './api';

// Sagas
export function* createPlayerRequest({ payload: playerName }) {
  // TODO get the id back from the call and set it in the success payload
  // to be written in the store as Player: { name, id }
  const realm = yield select(realmSelector);

  if (!realm) throw new Error('Failed to select realm from store, check that it is present');

  const { id: realmId } = realm;

  const response = yield call(createPlayer, realmId, playerName);
  if (response.errors) throw new Error('Failed to create new player');
  const { createPlayer: player } = response.data;

  yield put(createPlayerSuccess(parseInt(player.id, 10), player.name));
}

export function* createSessionRequest({ payload }) {
  const { name, time, playerSessions } = payload;
  const realm = yield select(realmSelector);

  if (!realm) throw new Error('Failed to select realm from store, check that it is present');

  const { id: realmId } = realm;

  // Convert dollar amounts from inputs to cents to send to API
  const dollarsToCents = playerSessions.map(s => ({
    ...s,
    buyin: Number((s.buyin * 100).toFixed(2)),
    walkout: Number((s.walkout * 100).toFixed(2)),
  }));

  const response = yield call(createSession, realmId, name, time, dollarsToCents);

  if (response.data) {
    const { putSession } = response.data
    yield put(createSessionSuccess(putSession));
    const path = location.pathname.replace("new", putSession.id);
    yield put(push(path));
    yield put(showToast(`Successfully created session: ${putSession.name}`));
    yield delay(3000);
    yield put(hideToast());
  }
}

export function* fetchSessionRequest({ payload }) {
  const { sessionId } = payload;

  const response = yield call(fetchSession, sessionId);

  if (response.data) {
    yield put(fetchSessionSuccess(response.data.sessionById));
  }
}

export default function* watchSessionActions() {
  yield [
    takeLatest(CREATE_PLAYER, createPlayerRequest),
    takeLatest(CREATE_SESSION_REQUEST, createSessionRequest),
    takeLatest(FETCH_SESSION, fetchSessionRequest),
  ];
}
