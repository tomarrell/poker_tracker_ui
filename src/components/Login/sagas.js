import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';

// Utils
import { addRecentRealm } from '../../utils/localstorage';

// Actions
import { CREATE_REALM, LOGIN_REALM, successEnterRealm } from './actions';

// Api
import { createRealm, loginRealm } from './api';

// Sagas
export function* createRealmRequest({ payload }) {
  const { name, title } = payload;
  const response = yield call(createRealm, name, title);

  if (response.errors) throw new Error('Failed to create new realm');
  const { createRealm: realm } = response.data;

  yield call(addRecentRealm, realm.id, realm.name, realm.title)
  yield put(successEnterRealm(parseInt(realm.id, 10), realm.name, realm.title))
}

export function* loginRealmRequest({ payload }) {
  const { name } = payload;
  const response = yield call(loginRealm, name);

  if (response.errors) throw new Error('Failed to login to realm');
  const { realmByName: realm } = response.data;

  yield call(addRecentRealm, realm.id, realm.name, realm.title)
  yield put(successEnterRealm(parseInt(realm.id, 10), realm.name, realm.title))
  console.log(push('/overview/test'));
  console.log('here');
}

export default function* watchEnterActions() {
  yield [
    takeLatest(CREATE_REALM, createRealmRequest),
    takeLatest(LOGIN_REALM, loginRealmRequest),
  ];
}
