import { takeLatest, put, call } from 'redux-saga/effects';

// Actions
import {
  CREATE_PLAYER,
  createPlayerSuccess,
} from './actions';

// Api
import { createPlayer } from './api';

// Sagas
export function* createPlayerRequest({ payload: name }) {
  // TODO get the id back from the call and set it in the success payload
  // to be written in the store as Player: { name, id }
  yield call(createPlayer, name);
  yield put(createPlayerSuccess({
    name,
  }));
}

export default function* watchSessionActions() {
  yield [
    takeLatest(CREATE_PLAYER, createPlayerRequest),
  ];
}
