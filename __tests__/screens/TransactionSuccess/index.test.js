import 'react-native';
import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import TransactionSuccess from '~/screens/TransactionSuccess';
import Store from '~/store/Store';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('< TransactionSuccess/>', () => {
  it('TransactionSuccess renders correctly', () => {
    const tree = renderer
      .create(
        <SafeAreaProvider store={Store}>
          <TransactionSuccess />,
        </SafeAreaProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
