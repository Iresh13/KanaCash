import {
  SIGNUP_POST_API_REQUEST,
  SIGNUP_POST_API_SUCCESS,
  SIGNUP_POST_API_FAILURE,
} from '~/store/actions/constant/ActionTypes';
import {setError} from '~/store/actions/Error';
// import {setToken} from '~/store/actions/AuthAction';
import {showLoader, hideLoader} from '~/store/actions/LoaderAction';
import * as api from '~/services/axios/Api';
import SInfo from 'react-native-sensitive-info';
import {navigate} from '../../navigation/RootNavigation';
import {
  // NAVIGATION_TO_EMAIL_VERIFICATION_CODE_SCREEN,
  NAVIGATION_TO_PHONE_VERIFICATION_CODE_SCREEN,
  //  NAVIGATION_TO_EMAIL_VERIFICATION_SCREEN
} from '../../navigation/routes';
import config from '../../constants/config';

export const signupApiRequestAction = loginRequest => (dispatch, getState) => {
  dispatch({
    type: SIGNUP_POST_API_REQUEST,
  });
  dispatch(showLoader());
};

export const signupApiSuccessAction = (signupSuccess, body) => (
  dispatch,
  getState,
) => {
  dispatch({
    type: SIGNUP_POST_API_SUCCESS,
    payload: {...signupSuccess, ...body},
  });
  dispatch(hideLoader());
  navigate(NAVIGATION_TO_PHONE_VERIFICATION_CODE_SCREEN);
  // navigate(NAVIGATION_TO_EMAIL_VERIFICATION_CODE_SCREEN);
};

export const signupApiFailureAction = loginFailure => (dispatch, getState) => {
  dispatch({
    type: SIGNUP_POST_API_FAILURE,
    payload: loginFailure,
  });
  if (loginFailure != undefined) {
    let modalConfig = {
      message: loginFailure.message ? loginFailure.message : 'Sorry',
      // message_title: loginFailure?.error,
    };
    dispatch(hideLoader());
    dispatch(setError(modalConfig));
  }
};

export const signupApi = body => (dispatch, getState) => {
  dispatch(signupApiRequestAction());
  api
    .signup(body)
    .then(async response => {
      if (response.status === 200) {
        const saveToken = await SInfo.setItem(
          config.accessToken,
          response.data.token,
          {
            sharedPreferencesName: config.sharedPreferencesName,
            keychainService: config.keychainService,
          },
        );
        dispatch(signupApiSuccessAction(response.data, body));
      } else {
        dispatch(signupApiFailureAction(response.data));
      }
    })
    .catch(error => {
      dispatch(signupApiFailureAction(error.data));
    });
};

export const resendVerificationCodeApi = type => (dispatch, getState) => {
  dispatch(showLoader());
  return api
    .resendVerificationCode(type)
    .then(response => {
      dispatch(hideLoader());
      console.log('resendVerificationCode', response);
      return response;
    })
    .catch(error => {
      dispatch(hideLoader());
      console.log('verificationcode error', error);
    });
};
