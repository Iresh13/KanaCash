import {SET_SUCCESS} from '~/store/actions/constant/ActionTypes.js';

import {Platform} from 'react-native';

import {showModal} from '~/store/actions/Modal';

export const setSuccess = success => dispatch => {
  dispatch({
    type: SET_SUCCESS,
    payload: success,
  });

  if (Platform.OS === 'ios') {
    setTimeout(() => {
      dispatch(showModal(success));
    }, 300);
  } else {
    dispatch(showModal(success));
  }
};
