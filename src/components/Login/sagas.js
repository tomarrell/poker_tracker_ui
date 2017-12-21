import { takeLatest, call } from 'redux-saga/effects';

// Utils
import { addRecentRealm } from '../../utils/localstorage';

// Actions
import { CREATE_REALM } from './actions';

// Api
import { createRealm } from './api';

// Sagas
export function* createRealmRequest({ payload }) {
  const { name, title } = payload;

  yield call(createRealm, name, title);
  yield call(addRecentRealm, name)
}

export default function* watchEnterActions() {
  yield [
    takeLatest(CREATE_REALM, createRealmRequest),
  ];
}
