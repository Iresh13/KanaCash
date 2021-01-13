import {
  SET_ERROR,
  RESET_ERROR,
  RESET_STORE,
} from '~/store/actions/constant/ActionTypes.js';

const INITIAL_STATE = {
  message_title: null,
  message: null,
  statusCode: null,
};

const ErrorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        message: action.payload.message,
        message_title: action.payload.message_title,
        statusCode: action.payload.statusCode,
      };

    case RESET_ERROR:
      return {
        ...state,
        message: null,
        message_title: null,
        statusCode: null,
      };

    case RESET_STORE:
      return {
        ...state,
        message_title: null,
        message: null,
        statusCode: null,
      };

    default:
      return state;
  }
};

export default ErrorReducer;
