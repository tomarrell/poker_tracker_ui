import { spawn } from "redux-saga/effects";

import loginSaga from "./components/Login/sagas";
import overviewSaga from "./components/Overview/sagas";
import sessionSaga from "./components/Session/sagas";

export default function* rootSaga() {
  const sagas = [spawn(loginSaga), spawn(overviewSaga), spawn(sessionSaga)];

  yield sagas;
}
