import {
  EXAMPLE_ACTION,
} from './actions';

const initialState = {
  example: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case EXAMPLE_ACTION: {
      console.log('Reducing example action.');
      return {
        ...state,
        example: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
