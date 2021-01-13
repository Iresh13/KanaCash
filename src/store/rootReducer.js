import {combineReducers} from 'redux';

import LoginReducer from './reducers/LoginReducer';
import SignupReducer from './reducers/SignupReducer';
import ForgotPasswordReducer from './reducers/ForgotPassword';
import LoaderReducer from './reducers/LoaderReducer';
import ModalReducer from './reducers/Modal';
import NetworkReducer from './reducers/Network';
import AuthReducer from './reducers/AuthReducer';
import ErrorReducer from './reducers/Error';
import TransactionReducer from './reducers/TransactionReducer';
import DeviceVerificationReducer from './reducers/DeviceVerificationReducer';

const rootReducer = combineReducers({
  login: LoginReducer,
  signup: SignupReducer,
  forgotPassword: ForgotPasswordReducer,
  loader: LoaderReducer,
  modal: ModalReducer,
  network: NetworkReducer,
  auth: AuthReducer,
  error: ErrorReducer,
  transaction: TransactionReducer,
  deviceVerification: DeviceVerificationReducer,
});

export default rootReducer;
