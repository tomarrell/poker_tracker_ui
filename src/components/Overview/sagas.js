import { put, call, takeLatest, select } from "redux-saga/effects";

import { realmSelector } from "../Login/selectors";
import { SUCCESS_ENTER_REALM, loginRealm } from "../Login/actions";
import {
  fetchSessionsByRealmId,
  fetchPlayersByRealmId,
  fetchRealmSummaryByRealmId
} from "./api";
import {
  fetchSessionsSuccess,
  fetchPlayersSuccess,
  FETCH_REALM_INFO,
  fetchRealmInfoSuccess
} from "./actions";

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
  const { data } = yield call(fetchRealmSummaryByRealmId, `${id}`);
  const { realmById: realmSummary } = data;

  const parsedRealmSummary = {
    sessions: realmSummary.sessions.map(s => ({
      ...s,
      id: Number(s.id),
      realmId: Number(s.realmId)
    })),
    players: realmSummary.players.map(p => ({
      ...p,
      id: Number(p.id)
    }))
  };

  yield put(fetchRealmInfoSuccess(parsedRealmSummary));
}

export function* fetchRealmThenInfo() {
  // Pull the realm name out of the path to fetch
  // the important info. In the future, we will need to check
  // local storage/cookie for auth details when navigating
  // direct via URL
  const realmName = document.location.pathname
    .replace("/overview/", "")
    .split("/")[0];

  yield put(loginRealm(realmName));
}

export default function* watchOverview() {
  yield [
    takeLatest(SUCCESS_ENTER_REALM, fetchRealmInfo),
    takeLatest(FETCH_REALM_INFO, fetchRealmThenInfo)
  ];
}
