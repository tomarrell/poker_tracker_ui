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
export function* createPlayerRequest({ payload: playerName }) {
  // TODO get the id back from the call and set it in the success payload
  // to be written in the store as Player: { name, id }
  const realm = yield select(realmSelector);

  if (!realm) throw new Error('Failed to select realm from store, check that it is present');

  const { id } = realm; 

  yield call(createPlayer, id, playerName);
  yield put(createPlayerSuccess({ player: playerName }));
}

export default function* watchSessionActions() {
  yield [
    takeLatest(CREATE_PLAYER, createPlayerRequest),
  ];
}
