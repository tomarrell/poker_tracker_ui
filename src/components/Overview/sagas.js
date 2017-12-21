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

  yield put(fetchSessionsSuccess(sessions));
}

export function* fetchPlayers(realmId) {
  // TODO fetchPlayersByRealmId IS NOT DEFINED YET
  const players = yield call(fetchPlayersByRealmId, realmId);

  yield put(fetchPlayersSuccess(players));
}

export function* fetchRealmInfo() {
  const realmId = yield select(realmSelector);

  yield [
    // TODO allow fetching of these, careful when they navigate
    // directly to session page as realm won't be set in state
    // fork(fetchSessions, realmId),
    // fork(fetchPlayers, realmId),
  ];
}

export default function* watchOverview() {
  yield [
    takeLatest(FETCH_REALM_INFO, fetchRealmInfo),
  ];
};
