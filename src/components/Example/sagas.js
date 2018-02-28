import { call, takeLatest } from 'redux-saga/effects';

import { fetchExample } from './api';
import { EXAMPLE_ACTION } from './actions';

export function* fetchExampleSaga(id) {
  const { data } = yield call(fetchExample, id); // eslint-disable-line

  // Put success action to be handled by reducer
  // e.g. yield put(fetchExample(id));
}

export default function* watchOverview() {
  yield [
    // takeLatest(EXAMPLE_ACTION, fetchExampleSaga),
  ];
}
