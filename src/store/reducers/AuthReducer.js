import {
  SET_USER,
  SET_TOKEN,
  RESET_AUTH,
  RESET_TOKEN,
  REFRESH_ACCESS_TOKEN,
  IS_LOG_IN_FORM_CALCULATOR,
} from '~/store/actions/constant/ActionTypes';
import {SET_PROFILE_COMPLETE_STATUS} from '../actions/constant/ActionTypes';

const INITIAL_STATE = {
  user: {},
  status: {},
  isAuthenticated: false,
  profileCompleteStatus: {
    baneficiaryComplete: false,
    cardComplete: false,
  },
  profileComplete: false,
  isLoginFromCalculator: false,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        ...action.payload,
      };

    case SET_TOKEN:
      return {
        ...state,
        isAuthenticated: true,
      };

    case REFRESH_ACCESS_TOKEN:
      return {
        ...state,
      };

    case RESET_AUTH:
      return {
        user: {},
        status: {},
        isAuthenticated: false,
        profileCompleteStatus: {
          baneficiaryComplete: false,
          cardComplete: false,
        },
        profileComplete: false,
      };

    case RESET_TOKEN:
      return {
        user: {},
        status: {},
        isAuthenticated: false,
        profileCompleteStatus: {
          baneficiaryComplete: false,
          cardComplete: false,
        },
        profileComplete: false,
      };

    case SET_PROFILE_COMPLETE_STATUS:
      return {
        ...state,
        profileCompleteStatus: {...action.payload},
        profileComplete:
          action.payload.baneficiaryComplete && action.payload.cardComplete,
      };

    case IS_LOG_IN_FORM_CALCULATOR:
      return {
        ...state,
        isLoginFromCalculator: action.payload,
      };

    default:
      return state;
  }
};

export default AuthReducer;
