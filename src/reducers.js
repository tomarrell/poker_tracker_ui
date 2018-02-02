import { combineReducers } from 'redux';

// Individual reducers
import loginReducer from './components/Login/reducer';
import overviewReducer from './components/Overview/reducer';
import toastReducer from './components/Toast/reducer';
import sessionReducer from './components/Session/reducer';

export default (router) => combineReducers({
  login: loginReducer,
  overview: overviewReducer,
  toast: toastReducer,
  session: sessionReducer,
  router,
});
