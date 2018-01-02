import { takeLatest, call, put } from 'redux-saga/effects';

// Utils
import { addRecentRealm } from '../../utils/localstorage';

// Actions
import { CREATE_REALM, successEnterRealm } from './actions';

// Api
import { createRealm } from './api';

// Sagas
export function* createRealmRequest({ payload }) {
  const { name, title } = payload;
  const response = yield call(createRealm, name, title);

  if (response.errors) throw new Error('Failed to create new realm');
  const { createRealm: realm } = response.data;

  yield call(addRecentRealm, realm.id, realm.name, realm.title)
  yield put(successEnterRealm(parseInt(realm.id, 10), realm.name, realm.title))
}

export default function* watchEnterActions() {
  yield [
    takeLatest(CREATE_REALM, createRealmRequest),
  ];
}
