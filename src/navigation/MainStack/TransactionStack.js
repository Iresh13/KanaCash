import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {TransactionScreen, TransactionDetailScreen} from '~/screens/';

import {
  NAVIGATION_TO_TRANSACTIONS_SCREEN,
  NAVIGATION_TO_TRANSACTION_DETAILS_SCREEN,
} from '../routes';

const TransactionStack = createStackNavigator();

const TransactionStackNavigation = () => (
  <TransactionStack.Navigator headerMode="none">
    <TransactionStack.Screen
      name={NAVIGATION_TO_TRANSACTIONS_SCREEN}
      component={TransactionScreen}
    />
    <TransactionStack.Screen
      name={NAVIGATION_TO_TRANSACTION_DETAILS_SCREEN}
      component={TransactionDetailScreen}
    />
  </TransactionStack.Navigator>
);

export default TransactionStackNavigation;
