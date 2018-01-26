import { SUCCESS_ENTER_REALM, REALM_LOADING } from './actions';

const initialState = {
  realm: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REALM_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case SUCCESS_ENTER_REALM: {
      return {
        ...state,
        realm: action.payload,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}
