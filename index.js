/**
 * @format
 */
require('react-native').unstable_enableLogBox();
import {AppRegistry} from 'react-native';
import React from 'react';
import {name as appName} from './app.json';
import SInfo from 'react-native-sensitive-info';
import {PersistGate} from 'redux-persist/es/integration/react';
import axios from 'axios';
import {Provider} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {NetworkProvider} from '~/components/network/NetworkProvider';
import {hideLoader} from '~/store/actions/LoaderAction';
import {showNetInfo} from '~/store/actions/Network';
import {
  getNewAccessToken,
  refreshAccessToken,
} from '~/store/actions/AuthAction';
import createStore from '~/store/Store';
import SConfig from './src/constants/config';
import App from './App';

const {persistor, store} = createStore();
const onBeforeLift = () => {};

//setup AXIOS INTERCEPTOR
axios.defaults.baseURL = 'https://uat.kanacash.com/v1';
axios.defaults.headers.post['Content-Type'] = 'application/json';

let networkConnectivityCheck = false;
let showModalOnce = false;

axios.interceptors.request.use(
  async function(config) {
    await NetInfo.fetch().then(state => {
      if (state.isConnected) {
        showModalOnce = true;
        networkConnectivityCheck = true;
      } else {
        showModalOnce = false;
        networkConnectivityCheck = false;
      }
    });

    if (!networkConnectivityCheck) {
      if (!showModalOnce) {
        store.dispatch(hideLoader());
        store.dispatch(showNetInfo());
      }
    } else {
      let endpoint = config.url;
      const token = await SInfo.getItem(SConfig.accessToken, {
        sharedPreferencesName: SConfig.sharedPreferencesName,
        keychainService: SConfig.keychainService,
      });
      if (token != null && !endpoint.includes('renewtoken')) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // console.log('config', config);

      return config;
    }
  },
  function(err) {
    console.log('interceptors request.use', err);
    return Promise.reject(err);
  },
);

let isAlreadyFetchingAccessToken = false;
let subscribers = [];

function onAccessTokenFetched(access_token) {
  subscribers = subscribers.filter(callback => callback(access_token));
}

function addSubscriber(callback) {
  subscribers.push(callback);
}

axios.interceptors.response.use(
  response => {
    return response;
  },
  function(error) {
    // Do something with response error
    if (networkConnectivityCheck) {
      if (error.response.status === 400) {
        return error.response;
      }
      // we have the error
      // we focus on token expired
      const message = error.response.data.message;
      const statusCode = error.response.status;
      const originalRequest = error.config;
      if (statusCode === 401 && message === 'Unauthorized') {
        // time to ask for fresh token
        if (!isAlreadyFetchingAccessToken) {
          isAlreadyFetchingAccessToken = true;
          store
            .dispatch(getNewAccessToken())
            .then(res => {
              if (res.status === 200) {
                isAlreadyFetchingAccessToken = false;
                SInfo.setItem(SConfig.accessToken, res.data.token, {
                  sharedPreferencesName: SConfig.sharedPreferencesName,
                  keychainService: SConfig.keychainService,
                });
                onAccessTokenFetched(res.data.token);
              }
            })
            .catch(err => {
              console.log(err);
            });
        }

        const retryOriginalRequest = new Promise(resolve => {
          addSubscriber(access_token => {
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
            resolve(axios(originalRequest));
          });
        });
        return retryOriginalRequest;
      }
      return Promise.reject(error.response);
    }
    return Promise.reject(error.response);
  },
);

const RNRedux = () => (
  <NetworkProvider>
    <Provider store={store}>
      <PersistGate
        loading={null}
        onBeforeLift={onBeforeLift}
        persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </NetworkProvider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
