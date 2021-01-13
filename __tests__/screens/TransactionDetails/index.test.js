import 'react-native';
import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import TransactionDetail from '~/screens/TransactionDetail';
import Store from '~/store/Store';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('< TransactionDetail/>', () => {
  it('TransactionDetail renders correctly', () => {
    const tree = renderer
      .create(
        <SafeAreaProvider store={Store}>
          <TransactionDetail />,
        </SafeAreaProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
