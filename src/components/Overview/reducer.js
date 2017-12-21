import {
  FETCH_SESSIONS_SUCCESS,
  FETCH_PLAYERS_SUCCESS,
} from './actions';

const initialState = {
  sessions: [],
  players: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SESSIONS_SUCCESS: {
      return {
        ...state,
        sessions: action.payload,
      };
    }
    case FETCH_PLAYERS_SUCCESS: {
      return {
        ...state,
        players: action.payload,
      };
    }
    default:
      return state;
  }
}
