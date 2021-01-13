import {SET_NET_INFO} from '../actions/constant/ActionTypes';

const INITIAL_STATE = {
  isNetworkConnected: true,
};

const NetworkReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_NET_INFO:
      return {
        ...state,
        isNetworkConnected: action.payload.isNetworkConnected,
      };

    default:
      return state;
  }
};

export default NetworkReducer;
