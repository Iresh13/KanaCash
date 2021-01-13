// import {
//   LOGIN_POST_API_REQUEST,
//   LOGIN_POST_API_SUCCESS,
//   LOGIN_POST_API_FAILURE,
// } from '~/store/actions/constant/ActionTypes';
import SInfo from 'react-native-sensitive-info';
import {setError} from '~/store/actions/Error';
// import {setToken} from '~/store/actions/AuthAction';
import {showLoader, hideLoader} from '~/store/actions/LoaderAction';
import * as api from '~/services/axios/Api';
import config from '../../constants/config';
import {navigate} from '../../navigation/RootNavigation';
import {NAVIGATION_TO_DEVICE_VERIFICATION_CODE} from '../../navigation/routes';
import {loginApiSuccessAction} from './LoginAction';

export const verifyDeviceVerificationApi = body => (dispatch, getState) => {
  dispatch(showLoader());
  const deviceVerification = getState().deviceVerification;
  console.log('deviceVerification', deviceVerification);
  console.log('body', body);
  api
    .verifyDeviceVerificationCode(deviceVerification.device_id, body)
    .then(async response => {
      if (response.status === 200) {
        const saveToken = await SInfo.setItem(
          config.accessToken,
          deviceVerification.token,
          {
            sharedPreferencesName: config.sharedPreferencesName,
            keychainService: config.keychainService,
          },
        );
        dispatch(loginApiSuccessAction(response.data));
        dispatch(hideLoader());
      } else {
        dispatch(hideLoader());
        let modalConfig = {
          message: response.data.message ? response.data.message : 'Sorry',
          message_title: '',
        };
        dispatch(setError(modalConfig));
      }
    })
    .catch(err => {
      dispatch(hideLoader());
      let modalConfig = {
        message: err.data.message ? err.data.message : 'Sorry',
        message_title: '',
      };
      dispatch(setError(modalConfig));
    });
};

export const resendDeviceVerificationCodeApi = resend => (
  dispatch,
  getState,
) => {
  if (resend) {
    dispatch(showLoader());
  }
  const device_id = getState().deviceVerification.device_id;
  return (
    api
      .resendDeviceVerificationCode(device_id)
      .then(response => {
        dispatch(hideLoader());
        if (response.status === 200) {
          if (!resend) {
            navigate(NAVIGATION_TO_DEVICE_VERIFICATION_CODE);
          }
        } else {
          console.log('error response', response);
          let modalConfig = {
            message: response.data.message ? response.data.message : 'Sorry',
            message_title: response.data.error,
          };
          dispatch(setError(modalConfig));
        }
        return response;
      })
      // eslint-disable-next-line handle-callback-err
      .catch(err => {
        dispatch(hideLoader());
      })
  );
};
