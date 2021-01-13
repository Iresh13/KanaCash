import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  EmailVerificationCodeScreen,
  EmailVerificationScreen,
  EmailVerifiedScreen,
  ForgotPasswordScreen,
  GetStartedScreen,
  LoginScreen,
  PhoneVerificationCodeScreen,
  PhoneVerifiedScreen,
  UserInformationScreen,
  UserVerifiedScreen,
  CalculatorScreen,
  AuthOptionScreen,
  DeviceVerificationCodeScreen,
} from '~/screens/';

import {
  NAVIGATION_TO_LOGIN_SCREEN,
  NAVIGATION_TO_FORGOT_PASSWORD_SCREEN,
  NAVIGATION_TO_GET_STARTED_SCREEN,
  NAVIGATION_TO_PHONE_VERIFICATION_CODE_SCREEN,
  NAVIGATION_TO_PHONE_VERIFIED_SCREEN,
  NAVIGATION_TO_EMAIL_VERIFICATION_SCREEN,
  NAVIGATION_TO_EMAIL_VERIFICATION_CODE_SCREEN,
  NAVIGATION_TO_EMAIL_VERIFIED_SCREEN,
  NAVIGATION_TO_USER_INFORMATION_SCREEN,
  NAVIGATION_TO_USER_VERIFIED_SCREEN,
  NAVIGATION_TO_CALCULATOR_SCREEN,
  NAVIGATION_TO_AUTH_OPTION_SCREEN,
  NAVIGATION_TO_DEVICE_VERIFICATION_CODE,
} from '../routes';

const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen
      name={NAVIGATION_TO_CALCULATOR_SCREEN}
      component={CalculatorScreen}
    />
    <AuthStack.Screen
      name={NAVIGATION_TO_AUTH_OPTION_SCREEN}
      component={AuthOptionScreen}
    />
    <AuthStack.Screen
      name={NAVIGATION_TO_LOGIN_SCREEN}
      component={LoginScreen}
    />
    <AuthStack.Screen
      name={NAVIGATION_TO_DEVICE_VERIFICATION_CODE}
      component={DeviceVerificationCodeScreen}
    />
    <AuthStack.Screen
      name={NAVIGATION_TO_FORGOT_PASSWORD_SCREEN}
      component={ForgotPasswordScreen}
    />
    <AuthStack.Screen
      name={NAVIGATION_TO_GET_STARTED_SCREEN}
      component={GetStartedScreen}
    />
    <AuthStack.Screen
      name={NAVIGATION_TO_PHONE_VERIFICATION_CODE_SCREEN}
      component={PhoneVerificationCodeScreen}
    />
    <AuthStack.Screen
      name={NAVIGATION_TO_PHONE_VERIFIED_SCREEN}
      component={PhoneVerifiedScreen}
    />

    <AuthStack.Screen
      name={NAVIGATION_TO_EMAIL_VERIFICATION_SCREEN}
      component={EmailVerificationScreen}
    />
    <AuthStack.Screen
      name={NAVIGATION_TO_EMAIL_VERIFICATION_CODE_SCREEN}
      component={EmailVerificationCodeScreen}
    />
    <AuthStack.Screen
      name={NAVIGATION_TO_EMAIL_VERIFIED_SCREEN}
      component={EmailVerifiedScreen}
    />

    <AuthStack.Screen
      name={NAVIGATION_TO_USER_INFORMATION_SCREEN}
      component={UserInformationScreen}
    />
    <AuthStack.Screen
      name={NAVIGATION_TO_USER_VERIFIED_SCREEN}
      component={UserVerifiedScreen}
    />
  </AuthStack.Navigator>
);

export default AuthStackScreen;
