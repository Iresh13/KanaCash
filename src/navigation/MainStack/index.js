import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  WidgetScreen,
  GetStartedScreen,
  PhoneVerificationCodeScreen,
  PhoneVerifiedScreen,
  EmailVerificationScreen,
  EmailVerificationCodeScreen,
  EmailVerifiedScreen,
} from '~/screens/';

import Drawer from './Drawer';
import {
  NAVIGTION_TO_WIDGETS_SCREEN,
  NAVIGATION_TO_DASHBOARD_STACK,
  NAVIGATION_TO_GET_STARTED_SCREEN,
  NAVIGATION_TO_PHONE_VERIFICATION_CODE_SCREEN,
  NAVIGATION_TO_PHONE_VERIFIED_SCREEN,
  NAVIGATION_TO_EMAIL_VERIFICATION_SCREEN,
  NAVIGATION_TO_EMAIL_VERIFICATION_CODE_SCREEN,
  NAVIGATION_TO_EMAIL_VERIFIED_SCREEN,
  NAVIGATION_TO_DRAWER,
  SECONDARY_STACK,
} from '../routes';

const MainStack = createStackNavigator();
const SecondaryStack = createStackNavigator();

const SecondaryStackScreen = () => {
  return (
    <SecondaryStack.Navigator headerMode="none">
      <SecondaryStack.Screen
        name={NAVIGATION_TO_GET_STARTED_SCREEN}
        component={GetStartedScreen}
      />
      <SecondaryStack.Screen
        name={NAVIGATION_TO_EMAIL_VERIFICATION_SCREEN}
        component={EmailVerificationScreen}
      />
      <SecondaryStack.Screen
        name={NAVIGATION_TO_PHONE_VERIFICATION_CODE_SCREEN}
        component={PhoneVerificationCodeScreen}
      />
      <SecondaryStack.Screen
        name={NAVIGATION_TO_PHONE_VERIFIED_SCREEN}
        component={PhoneVerifiedScreen}
      />
      <SecondaryStack.Screen
        name={NAVIGATION_TO_EMAIL_VERIFICATION_CODE_SCREEN}
        component={EmailVerificationCodeScreen}
      />
      <SecondaryStack.Screen
        name={NAVIGATION_TO_EMAIL_VERIFIED_SCREEN}
        component={EmailVerifiedScreen}
      />
      {/* <SecondaryStack.Screen
        name={NAVIGATION_TO_EMAIL_VERIFIED_SCREEN}
        component={EmailVerifiedScreen}
      /> */}
    </SecondaryStack.Navigator>
  );
};

const MainStackScreen = () => (
  <MainStack.Navigator
    headerMode="none"
    initialRouteName={NAVIGATION_TO_DRAWER}>
    <MainStack.Screen name={NAVIGATION_TO_DRAWER} component={Drawer} />
    <MainStack.Screen
      name={NAVIGTION_TO_WIDGETS_SCREEN}
      component={WidgetScreen}
    />
    <MainStack.Screen name={SECONDARY_STACK} component={SecondaryStackScreen} />
  </MainStack.Navigator>
);

export default MainStackScreen;
