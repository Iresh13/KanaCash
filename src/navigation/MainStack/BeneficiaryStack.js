import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {
  BeneficiaryScreen,
  CreateBeneficiaryScreen,
  BeneficiarySuccessScreen,
  AddReceiveMethodScreen,
} from '~/screens/';

import {
  NAVIGATION_TO_CREATE_BENEFICIARY_SCREEN,
  NAVIGATION_TO_BENEFICIARY_SCREEN,
  NAVIGATION_TO_BENEFICIARY_SUCCESS_SCREEN,
  NAVIGATION_TO_ADD_RECEIVE_METHOD_SCREEN,
} from '../routes';

const BeneficiaryStack = createStackNavigator();

const BeneficiaryStackNavigation = () => (
  <BeneficiaryStack.Navigator headerMode="none">
    <BeneficiaryStack.Screen
      name={NAVIGATION_TO_BENEFICIARY_SCREEN}
      component={BeneficiaryScreen}
    />
    <BeneficiaryStack.Screen
      name={NAVIGATION_TO_CREATE_BENEFICIARY_SCREEN}
      component={CreateBeneficiaryScreen}
    />
    <BeneficiaryStack.Screen
      name={NAVIGATION_TO_BENEFICIARY_SUCCESS_SCREEN}
      component={BeneficiarySuccessScreen}
    />
    <BeneficiaryStack.Screen
      name={NAVIGATION_TO_ADD_RECEIVE_METHOD_SCREEN}
      component={AddReceiveMethodScreen}
    />
  </BeneficiaryStack.Navigator>
);

export default BeneficiaryStackNavigation;
