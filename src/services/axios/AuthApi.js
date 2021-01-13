import axios from 'axios';
import endpoints, {verificationApi} from './endpoints';

// user authentication
export const login = body => {
  const options = {
    url: endpoints.signin,
    data: body,
    method: 'post',
  };
  return axios(options);
};

export const logout = () => {
  const options = {
    url: endpoints.signout,
    data: null,
    method: 'get',
  };
  return axios(options);
};

export const getCurrentUser = () => {
  const options = {
    url: endpoints.getCurrentUser,
    data: null,
    method: 'get',
  };
  return axios(options);
};

export const refreshToken = body => {
  const options = {
    url: '',
    data: body,
    method: 'post',
  };
  return axios(options);
};

export const forgotPassword = body => {
  const options = {
    url: endpoints.forgotPassword,
    data: body,
    method: 'post',
  };
  return axios(options);
};

export const signup = body => {
  const options = {
    url: endpoints.signup,
    data: body,
    method: 'post',
  };
  return axios(options);
};

export const verification = (type, code) => {
  const options = {
    url: verificationApi(type, code),
    data: null,
    method: 'get',
  };
  return axios(options);
};

export const widgets = (type, code) => {
  const options = {
    url: endpoints.getWidgetToken,
    data: null,
    method: 'get',
  };
  return axios(options);
};

export const resendVerificationCode = type => {
  const options = {
    url: `${endpoints.resendVerificationCode}${type}`,
    data: null,
    method: 'get',
  };
  return axios(options);
};

export const resendDeviceVerificationCode = deviceId => {
  const options = {
    url: `/devices/${deviceId}/resend-verification-code`,
    data: null,
    method: 'post',
  };
  return axios(options);
};

export const verifyDeviceVerificationCode = (deviceId, body) => {
  console.log('deviceId', deviceId);
  console.log('body', body);
  const options = {
    url: `/devices/${deviceId}/verify`,
    data: body,
    method: 'post',
  };
  return axios(options);
};
