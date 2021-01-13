import {
  FORGOT_PASSWORD_POST_API_REQUEST,
  FORGOT_PASSWORD_POST_API_SUCCESS,
  FORGOT_PASSWORD_POST_API_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
} from '../actions/constant/ActionTypes';

const INITIAL_STATE = {
  forgotPasswordSuccess: false,
};

const ForgotPasswordReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_POST_API_REQUEST:
      return {
        ...state,
      };

    case FORGOT_PASSWORD_POST_API_SUCCESS:
      return {
        ...state,
        forgotPasswordSuccess: action.payload.forgotPasswordSuccess,
      };

    case FORGOT_PASSWORD_POST_API_FAILURE:
      return {
        ...state,
      };

    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordSuccess: action.payload,
      };

    default:
      return state;
  }
};

export default ForgotPasswordReducer;
