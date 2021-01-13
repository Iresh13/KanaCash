import {
  FORGOT_PASSWORD_POST_API_REQUEST,
  FORGOT_PASSWORD_POST_API_SUCCESS,
  FORGOT_PASSWORD_POST_API_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
} from '~/store/actions/constant/ActionTypes';
import * as api from '~/services/axios/Api';
import {setError} from '~/store/actions/Error';
import {showLoader, hideLoader} from '~/store/actions/LoaderAction';

export const forgotPasswordSuccess = forgotPasswordSuccess => {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    payload: forgotPasswordSuccess,
  };
};

const forgotPasswordApiRequestAction = forgotPasswordRequest => dispatch => {
  dispatch(showLoader());

  dispatch({
    type: FORGOT_PASSWORD_POST_API_REQUEST,
  });
};

const forgotPasswordApiSuccessAction = forgotPasswordSuccess => dispatch => {
  dispatch({
    type: FORGOT_PASSWORD_POST_API_SUCCESS,
    payload: '',
  });

  dispatch(hideLoader());
  console.log('forgotPasswordSuccess');
  let modalConfig = {
    message:
      'We have send an email with a link to reset your password. Please check your email for further instructions.',
    message_title: 'Awesome!',
  };
  dispatch(setError(modalConfig));
};

const forgotPasswordApiFailureAction = forgotPasswordFailure => dispatch => {
  dispatch(hideLoader());
  dispatch({
    type: FORGOT_PASSWORD_POST_API_FAILURE,
    payload: forgotPasswordFailure,
  });

  console.log('forgotPasswordFailure', forgotPasswordFailure);
  if (forgotPasswordFailure != undefined) {
    let modalConfig = {
      message: forgotPasswordFailure.data.message,
      message_title: 'Sorry!',
    };

    dispatch(setError(modalConfig));
  }
};

export const forgotPasswordApi = email => dispatch => {
  let body = {
    email: email,
  };

  dispatch(forgotPasswordApiRequestAction());
  api
    .forgotPassword(body)
    .then(response => {
      dispatch(forgotPasswordApiSuccessAction());
    })
    .catch(error => {
      console.log('forgotPasswordApi error', error);
      dispatch(forgotPasswordApiFailureAction(error));
    });
};
