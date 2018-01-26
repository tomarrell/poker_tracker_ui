import { delay } from 'redux-saga';
import { takeLatest, call, put } from 'redux-saga/effects';
import { push } from 'react-router-redux';

// Utils
import { addRecentRealm } from '../../utils/localstorage';

// Actions
import { CREATE_REALM, LOGIN_REALM, successEnterRealm, enterRealmLoading } from './actions';
import { showToast, hideToast } from '../Toast/actions';

// Api
import { createRealm, loginRealm } from './api';

// Sagas
export function* createRealmRequest({ payload }) {
  const { name, title } = payload;

  yield put(enterRealmLoading());

  const response = yield call(createRealm, name, title);

  if (response.errors) {
    yield put(showToast('Failed to create realm. May already exist', 'error'));
    yield delay(3000);
    yield put(hideToast());
    return;
  }

  const { createRealm: realm } = response.data;

  yield call(addRecentRealm, realm.id, realm.name, realm.title)
  yield put(successEnterRealm(parseInt(realm.id, 10), realm.name, realm.title))
}

export function* loginRealmRequest({ payload }) {
  const { name } = payload;

  yield put(enterRealmLoading());

  const response = yield call(loginRealm, name);

  if (response.errors) {
    yield put(showToast('Failed to login to realm', 'error'));
    yield delay(3000);
    yield put(hideToast());
    return;
  }
  const { realmByName: realm } = response.data;

  yield call(addRecentRealm, realm.id, realm.name, realm.title);
  yield put(successEnterRealm(parseInt(realm.id, 10), realm.name, realm.title));
  yield put(push(`/overview/${realm.name}`));
  yield put(showToast(`Successful login to realm: ${realm.name}`));

  // Leave the toast message there for 3 seconds
  yield delay(3000);

  yield put(hideToast());
}

export default function* watchEnterActions() {
  yield [
    takeLatest(CREATE_REALM, createRealmRequest),
    takeLatest(LOGIN_REALM, loginRealmRequest),
  ];
}
