import { fork } from 'redux-saga/effects';

import loginSaga from './components/Login/sagas';

export default function* rootSaga() {
  const sagas = [
    fork(loginSaga),
  ];

  yield sagas;
}
