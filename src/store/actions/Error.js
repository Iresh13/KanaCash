import {Platform} from 'react-native';

import {
  SET_ERROR,
  RESET_ERROR,
  RESET_STORE,
} from '~/store/actions/constant/ActionTypes.js';

import {showModal} from '~/store/actions/Modal';

export const setError = error => dispatch => {
  dispatch({
    type: SET_ERROR,
    payload: error,
  });

  if (Platform.OS === 'ios') {
    setTimeout(() => {
      dispatch(showModal(error));
    }, 300);
  } else {
    dispatch(showModal(error));
  }
};

export const clearError = () => {
  return {
    type: RESET_ERROR,
  };
};

export const resetStore = () => {
  return {
    type: RESET_STORE,
  };
};
