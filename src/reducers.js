import { combineReducers } from 'redux';

// Individual reducers
import exampleReducer from './components/Example/reducer';

export default (router) => combineReducers({
  example: exampleReducer,
  router,
});
