import { put, call, all, takeLatest, select } from 'redux-saga/effects';

import { realmSelector } from '../Login/selectors';
import { SUCCESS_ENTER_REALM, loginRealm } from '../Login/actions';
import { fetchSessionsByRealmId, fetchPlayersByRealmId } from './api';
import {
  fetchSessionsSuccess,
  fetchPlayersSuccess,
  FETCH_REALM_INFO,
  fetchRealmInfoSuccess,
} from './actions';

export function* fetchSessions(realmId) {
  const { data } = yield call(fetchSessionsByRealmId, realmId);
  const { sessionsByRealmId: sessions } = data;

  yield put(fetchSessionsSuccess(sessions));
}

export function* fetchPlayers(realmId) {
  // TODO fetchPlayersByRealmId IS NOT DEFINED YET
  const { data } = yield call(fetchPlayersByRealmId, realmId);
  const { playersByRealmId: players } = data;

  yield put(fetchPlayersSuccess(players));
}

export function* fetchRealmInfo() {
  const { id } = yield select(realmSelector);

  yield all([
    // TODO allow fetching of these, careful when they navigate
    // directly to session page as realm won't be set in state
    call(fetchSessions, `${id}`),
    // call(fetchPlayers, id),
  ]);

  yield put(fetchRealmInfoSuccess());
}

export function* fetchRealmThenInfo() {
  // Pull the realm name out of the path to fetch
  // the important info. In the future, we will need to check
  // local storage/cookie for auth details when navigating 
  // direct via URL
  const realmName = document.location.pathname
    .replace('/overview/', '')
    .split('/')[0];

  yield put(loginRealm(realmName));
}

export default function* watchOverview() {
  yield [
    takeLatest(SUCCESS_ENTER_REALM, fetchRealmInfo),
    takeLatest(FETCH_REALM_INFO, fetchRealmThenInfo),
  ];
};
