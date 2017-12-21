import { fork, put, call, takeLatest, select } from 'redux-saga/effects';

import { realmSelector } from '../Login/selectors';
import { fetchSessionsByRealmId, fetchPlayersByRealmId } from './api';
import {
  FETCH_REALM_INFO,
  fetchSessionsSuccess,
  fetchPlayersSuccess,
} from './actions';

export function* fetchSessions(realmId) {
  const sessions = yield call(fetchSessionsByRealmId, realmId);
  console.log('Fetched sessions');

  yield put(fetchSessionsSuccess(sessions));
}

export function* fetchPlayers(realmId) {
  const players = yield call(fetchPlayersByRealmId, realmId);
  console.log('Fetched players');

  yield put(fetchPlayersSuccess(players));
}

export function* fetchRealmInfo() {
  const { realmId } = yield select(realmSelector);

  yield [
    fork(fetchSessions, realmId),
    fork(fetchPlayers, realmId),
  ];
}

export default function* watchOverview() {
  yield [
    takeLatest(FETCH_REALM_INFO, fetchRealmInfo),
  ];
};
