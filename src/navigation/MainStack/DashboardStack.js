import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  PayoutMethodScreen,
  CreateBeneficiaryScreen,
  AddBeneficiaryDetailsScreen,
  BeneficiarySuccessScreen,
  DashboardScreen,
  SendMoneyScreen,
  TransactionConfirmationScreen,
  TransactionSuccessScreen,
  WidgetScreen,
  PaymentMethodScreen,
  TransactionDetailScreen,
  AddReceiveMethodScreen,
} from '~/screens/';

import {
  NAVIGATION_TO_DASHBOARD_SCREEN,
  NAVIGATION_TO_SEND_MONEY_SCREEN,
  NAVIGATION_TO_TRANSACTION_CONFIRMATION_SCREEN,
  NAVIGATION_TO_TRANSACTION_SUCCESS_SCREEN,
  NAVIGATION_TO_PAYMENT_METHOD_SCREEN,
  NAVIGTION_TO_WIDGETS_SCREEN,
  NAVIGATION_TO_CREATE_BENEFICIARY_SCREEN,
  NAVIGATION_TO_ADD_BENEFICIARY_DETAILS_SCREEN,
  NAVIGATION_TO_BENEFICIARY_SUCCESS_SCREEN,
  NAVIGATION_TO_TRANSACTION_DETAILS_SCREEN,
  NAVIGATION_TO_PAYOUT_METHOD_SCREEN,
  NAVIGATION_TO_ADD_RECEIVE_METHOD_SCREEN,
} from '../routes';

const DashboardStack = createStackNavigator();

const DashboardStackScreen = () => (
  <DashboardStack.Navigator headerMode="none">
    <DashboardStack.Screen
      name={NAVIGATION_TO_DASHBOARD_SCREEN}
      component={DashboardScreen}
    />
    <DashboardStack.Screen
      name={NAVIGATION_TO_SEND_MONEY_SCREEN}
      component={SendMoneyScreen}
    />
    <DashboardStack.Screen
      name={NAVIGATION_TO_TRANSACTION_CONFIRMATION_SCREEN}
      component={TransactionConfirmationScreen}
    />
    <DashboardStack.Screen
      name={NAVIGATION_TO_TRANSACTION_SUCCESS_SCREEN}
      component={TransactionSuccessScreen}
    />
    <DashboardStack.Screen
      name={NAVIGATION_TO_PAYMENT_METHOD_SCREEN}
      component={PaymentMethodScreen}
    />

    <DashboardStack.Screen
      name={NAVIGATION_TO_CREATE_BENEFICIARY_SCREEN}
      component={CreateBeneficiaryScreen}
    />
    <DashboardStack.Screen
      name={NAVIGATION_TO_ADD_BENEFICIARY_DETAILS_SCREEN}
      component={AddBeneficiaryDetailsScreen}
    />
    <DashboardStack.Screen
      name={NAVIGATION_TO_ADD_RECEIVE_METHOD_SCREEN}
      component={AddReceiveMethodScreen}
    />

    {/* <DashboardStack.Screen
      name={NAVIGATION_TO_BENEFICIARY_SUCCESS_SCREEN}
      component={BeneficiarySuccessScreen}
    /> */}
    <DashboardStack.Screen
      name={NAVIGATION_TO_PAYOUT_METHOD_SCREEN}
      component={PayoutMethodScreen}
    />
    <DashboardStack.Screen
      name={NAVIGATION_TO_TRANSACTION_DETAILS_SCREEN}
      component={TransactionDetailScreen}
    />
  </DashboardStack.Navigator>
);

export default DashboardStackScreen;
