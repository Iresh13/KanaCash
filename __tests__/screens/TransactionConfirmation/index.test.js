import 'react-native';
import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import TransactionConfirmation from '~/screens/TransactionConfirmation';
import Store from '~/store/Store';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('< TransactionConfirmation/>', () => {
  it('TransactionConfirmation renders correctly', () => {
    const tree = renderer
      .create(
        <SafeAreaProvider store={Store}>
          <TransactionConfirmation />,
        </SafeAreaProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
