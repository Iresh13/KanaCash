import {
  LOGIN_POST_API_REQUEST,
  LOGIN_POST_API_SUCCESS,
  LOGIN_POST_API_FAILURE,
  ON_REQUEST_DEVICE_VERIFICATION_CODE,
} from '~/store/actions/constant/ActionTypes';
import {setError} from '~/store/actions/Error';
import {setToken} from '~/store/actions/AuthAction';
import {showLoader, hideLoader} from '~/store/actions/LoaderAction';
import * as api from '~/services/axios/Api';
import SInfo from 'react-native-sensitive-info';
import config from '../../constants/config';
import {resendDeviceVerificationCodeApi} from './DeviceVerificationAction';

export const loginApiRequestAction = loginRequest => (dispatch, getState) => {
  dispatch({
    type: LOGIN_POST_API_REQUEST,
  });
  dispatch(showLoader());
};

export const loginApiSuccessAction = loginSuccess => (dispatch, getState) => {
  dispatch({
    type: LOGIN_POST_API_SUCCESS,
    payload: loginSuccess,
  });
  dispatch(
    setToken({
      isAuthenticated: true,
    }),
  );
  dispatch(hideLoader());
};

export const loginApiFailureAction = loginFailure => (dispatch, getState) => {
  dispatch({
    type: LOGIN_POST_API_FAILURE,
    payload: loginFailure,
  });
  dispatch(hideLoader());
  if (loginFailure != undefined) {
    let modalConfig = {
      message: loginFailure.message ? loginFailure.message : 'Sorry',
      message_title: 'Invalid Credential!',
    };
    dispatch(setError(modalConfig));
  }
};

export const loginApi = body => async (dispatch, getState) => {
  dispatch(loginApiRequestAction());
  // const isLoginFromCalculator = getState().auth.isLoginFromCalculator;
  api
    .login(body)
    .then(async response => {
      try {
        const saveToken = await SInfo.setItem(
          config.accessToken,
          response.data.token,
          {
            sharedPreferencesName: config.sharedPreferencesName,
            keychainService: config.keychainService,
          },
        );
        dispatch(loginApiSuccessAction(response.data));
      } catch (error) {
        console.log('error', error);
        dispatch(loginApiFailureAction(error));
      }
    })
    .catch(async error => {
      if (error.status === 401) {
        dispatch(hideLoader());
        if (error.data.error === 'device_verification_required') {
          dispatch({
            type: ON_REQUEST_DEVICE_VERIFICATION_CODE,
            payload: error.data,
          });
          const saveToken = await SInfo.setItem(
            config.accessToken,
            error.data.token,
            {
              sharedPreferencesName: config.sharedPreferencesName,
              keychainService: config.keychainService,
            },
          );
          dispatch(resendDeviceVerificationCodeApi());
        } else {
          dispatch(loginApiFailureAction(error.data));
        }
      } else {
        dispatch(loginApiFailureAction(error.data));
      }
    });
};
