import { fork } from 'redux-saga/effects';

import loginSaga from './components/Login/sagas';
import overviewSaga from './components/Overview/sagas';
import sessionSaga from './components/Session/sagas';

export default function* rootSaga() {
  const sagas = [
    fork(loginSaga),
    fork(overviewSaga),
    fork(sessionSaga),
  ];

  yield sagas;
}
