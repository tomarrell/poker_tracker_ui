import { combineReducers } from 'redux';

function testReducer(state = {}, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  testReducer,
});
