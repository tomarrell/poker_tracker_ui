import { CREATE_REALM } from './actions';

const initialState = {
  realm: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_REALM: {
      return {
        realm: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
