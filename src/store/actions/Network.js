import {SET_NET_INFO} from '~/store/actions/constant/ActionTypes';

import {showModal} from '~/store/actions/Modal';

export const showNetInfo = netInfoData => dispatch => {
  netInfoData = {
    message_title: 'Sorry !!',
    message:
      'Looks like your device is not connected to internet. Please try again.',
  };

  dispatch(showModal(netInfoData));

  dispatch({
    type: SET_NET_INFO,
    payload: {
      isNetworkConnected: false,
    },
  });
};
