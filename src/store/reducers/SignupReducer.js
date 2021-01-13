import {
  SIGNUP_POST_API_REQUEST,
  SIGNUP_POST_API_SUCCESS,
  SIGNUP_POST_API_FAILURE,
} from '../actions/constant/ActionTypes';

const INITIAL_STATE = {
  email: '',
  phoneNumber: '',
};

const signupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_POST_API_REQUEST:
      return {
        ...state,
      };

    case SIGNUP_POST_API_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case SIGNUP_POST_API_FAILURE:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default signupReducer;
