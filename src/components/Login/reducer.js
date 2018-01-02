import { SUCCESS_ENTER_REALM } from './actions';

const initialState = {
  realm: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_ENTER_REALM: {
      return {
        realm: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
