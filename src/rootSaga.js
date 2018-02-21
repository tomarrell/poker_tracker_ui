import { spawn } from 'redux-saga/effects';

import exampleSaga from './components/Example/sagas';

export default function* rootSaga() {
  const sagas = [
    spawn(exampleSaga),
  ];

  yield sagas;
}
