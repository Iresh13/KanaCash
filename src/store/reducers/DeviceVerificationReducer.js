import {ON_REQUEST_DEVICE_VERIFICATION_CODE} from '~/store/actions/constant/ActionTypes';
import {SET_PROFILE_COMPLETE_STATUS} from '../actions/constant/ActionTypes';

const INITIAL_STATE = {};

const DeviceVerificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ON_REQUEST_DEVICE_VERIFICATION_CODE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

export default DeviceVerificationReducer;
