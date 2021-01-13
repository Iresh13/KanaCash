import {SET_SUCCESS} from '~/store/actions/constant/ActionTypes.js';

const INITIAL_STATE = {
  message_title: null,
  message: null,
};

const SuccessReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        message_title: action.payload.message_title,
      };

    default:
      return state;
  }
};

export default SuccessReducer;
