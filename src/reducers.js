import { combineReducers } from 'redux';

// Individual reducers
import loginReducer from './components/Login/reducer';

export default combineReducers({
  login: loginReducer,
});
