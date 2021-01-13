import 'react-native';
import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import PhoneVerificationCode from '~/screens/PhoneVerificationCode/';
import Store from '~/store/Store';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('<PhoneVerificationCode />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <SafeAreaProvider store={Store}>
          <PhoneVerificationCode />
        </SafeAreaProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
