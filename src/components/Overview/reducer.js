import {
  FETCH_SESSIONS_SUCCESS,
  FETCH_PLAYERS_SUCCESS,
  FETCH_REALM_INFO,
  FETCH_REALM_INFO_SUCCESS,
} from './actions';
import {
  CREATE_PLAYER_SUCCESS,
  CREATE_SESSION_SUCCESS,
} from '../Session/actions';

const initialState = {
  sessions: [],
  players: [],
  loading: false,
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
    case CREATE_PLAYER_SUCCESS: {
      const newPlayer = action.payload;
      return {
        ...state,
        players: [...state.players, newPlayer],
      };
    }
    case CREATE_SESSION_SUCCESS: {
      return {
        ...state,
        sessions: [...state.sessions, action.payload],
      };
    }
    case FETCH_REALM_INFO: {
      return {
        ...state,
        loading: true,
      };
    }
    case FETCH_REALM_INFO_SUCCESS: {
      const { sessions, players } = action.payload;
      return {
        ...state,
        players,
        sessions,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
};
