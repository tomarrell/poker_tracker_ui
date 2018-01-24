import { combineReducers } from 'redux';

// Individual reducers
import loginReducer from './components/Login/reducer';
import overviewReducer from './components/Overview/reducer';

export default (router) => combineReducers({
  login: loginReducer,
  overview: overviewReducer,
  router,
});
