import {
  RESET_AUTH,
  SET_USER,
  SET_TOKEN,
  RESET_TOKEN,
  REFRESH_ACCESS_TOKEN,
  REFRESH_TOKEN_POST_API_REQUEST,
  REFRESH_TOKEN_POST_API_SUCCESS,
  REFRESH_TOKEN_POST_API_FAILURE,
  IS_LOG_IN_FORM_CALCULATOR,
} from '~/store/actions/constant/ActionTypes';
import * as api from '~/services/axios/Api';
import {SET_PROFILE_COMPLETE_STATUS} from './constant/ActionTypes';

export const isLoginFromCalculator = value => dispatch => {
  dispatch({
    type: IS_LOG_IN_FORM_CALCULATOR,
    payload: value,
  });
};

export const resetAuth = () => {
  return {
    type: RESET_AUTH,
  };
};

export const setUser = data => dispatch => {
  dispatch({
    type: SET_USER,
    payload: data,
  });
};

export const setToken = tokenData => dispatch => {
  dispatch({
    type: SET_TOKEN,
    payload: tokenData,
  });
};

export const refreshAccessToken = tokenData => dispatch => {
  dispatch({
    type: REFRESH_ACCESS_TOKEN,
    payload: tokenData,
  });
};

export const clearToken = tokenData => dispatch => {
  dispatch({
    type: RESET_TOKEN,
  });
};

const refreshTokenRequestAction = () => dispatch => {
  dispatch({
    type: REFRESH_TOKEN_POST_API_REQUEST,
  });
};

const refreshTokenSuccessAction = tokenData => dispatch => {
  dispatch({
    type: REFRESH_TOKEN_POST_API_SUCCESS,
    payload: tokenData,
  });

  dispatch(refreshAccessToken(tokenData.data.token));
};

const refreshTokenFailureAction = tokenFailure => dispatch => {
  dispatch({
    type: REFRESH_TOKEN_POST_API_FAILURE,
    payload: tokenFailure,
  });
  dispatch(resetAuth());
};

export const checkProfileCompleteStatus = () => dispatch => {
  const baneficiaryApi = api.getBeneficiaries();
  const bankApi = api.getBanks();
  const cardApi = api.getCards();
  Promise.all([baneficiaryApi, bankApi, cardApi]).then(values => {
    const baneficiaryComplete = values[0].data.result.length > 0 ? true : false;
    const bankComplete = values[1].data.result.length > 0 ? true : false;
    const cardComplete = values[2].data.result.length > 0 ? true : false;
    const profileComplete = {
      baneficiaryComplete,
      cardComplete: bankComplete || cardComplete,
    };
    dispatch({
      type: SET_PROFILE_COMPLETE_STATUS,
      payload: profileComplete,
    });
  });
};

export const getNewAccessToken = () => dispatch => {
  return new Promise(async (resolve, reject) => {
    // const state = getState();
    let body = {};
    dispatch(refreshTokenRequestAction());
    api
      .refreshToken(body)
      .then(response => {
        dispatch(refreshTokenSuccessAction(response.data));
        resolve(response);
      })
      .catch(error => {
        dispatch(refreshTokenFailureAction(error.response));
        reject(error);
      });
  });
};
