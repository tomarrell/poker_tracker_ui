import { takeLatest, put, call, select } from 'redux-saga/effects';

// Actions
import {
  CREATE_PLAYER,
  createPlayerSuccess,
} from './actions';

// Selectors 
import { realmSelector } from '../Login/selectors';

// Api
import { createPlayer } from './api';

// Sagas
export function* createPlayerRequest({ payload: name }) {
  // TODO get the id back from the call and set it in the success payload
  // to be written in the store as Player: { name, id }
  const realmId = (yield select(realmSelector)).id;

  if (!realmId) throw new Error('Failed to select realmId from store, check that it is present');

  yield call(createPlayer, realmId, name);
  yield put(createPlayerSuccess({
    name,
  }));
}

export default function* watchSessionActions() {
  yield [
    takeLatest(CREATE_PLAYER, createPlayerRequest),
  ];
}
