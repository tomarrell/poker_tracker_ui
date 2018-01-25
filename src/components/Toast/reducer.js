import {
  SHOW_TOAST,
  HIDE_TOAST,
} from './actions';

const initialState = {
  show: false,
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_TOAST: {
      return {
        ...state,
        show: true,
        message: action.payload,
      };
    }
    case HIDE_TOAST: {
      return {
        ...state,
        show: false,
        message: '',
      };
    }
    default: {
      return state;
    }
  }
}
