import {
  FETCH_SESSION_SUCCESS,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_REQUEST,
} from './actions';

const initialState = {
  currentSession: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SESSION_SUCCESS: {
      return {
        ...state,
        currentSession: action.payload,
      };
    }
    case CREATE_SESSION_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case CREATE_SESSION_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}
