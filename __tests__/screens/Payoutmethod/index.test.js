import 'react-native';
import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import PayoutMethod from '~/screens/PayoutMethod';
import Store from '~/store/Store';

// Note: test renderer must be required after react-native.
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

describe('< PayoutMethod/>', () => {
  it('PayoutMethod renders correctly', () => {
    const tree = renderer
      .create(
        <SafeAreaProvider store={Store}>
          <PayoutMethod />,
        </SafeAreaProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
