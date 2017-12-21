import {
  FETCH_SESSIONS_SUCCESS,
  FETCH_PLAYERS_SUCCESS,
} from './actions';
import { CREATE_PLAYER_SUCCESS, } from '../Session/actions';

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
    case CREATE_PLAYER_SUCCESS: {
      const newPlayer = action.payload;
      return {
        ...state,
        players: [...state.players, newPlayer],
      }
    }
    default: {
      return state;
    }
  }
}
