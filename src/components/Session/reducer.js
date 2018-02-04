import {
  FETCH_SESSION_SUCCESS,
} from './actions';

const initialState = {
  currentSessions: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SESSION_SUCCESS: {
      return {
        ...state,
        currentSession: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
