import { takeLatest, put, call, select } from 'redux-saga/effects';

// Actions
import {
  CREATE_PLAYER,
  createPlayerSuccess,
  CREATE_SESSION_REQUEST,
  createSessionSuccess,
} from './actions';

// Selectors
import { realmSelector } from '../Login/selectors';

// Api
import { createPlayer, createSession } from './api';

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

  const response = yield call(createSession, realmId, name, time, playerSessions);

  if (response.data) {
    yield put(createSessionSuccess(response.data.createSession));
  }
}

export default function* watchSessionActions() {
  yield [
    takeLatest(CREATE_PLAYER, createPlayerRequest),
    takeLatest(CREATE_SESSION_REQUEST, createSessionRequest),
  ];
}
