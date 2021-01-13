import 'react-native';
import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import UserInformationScreen from '~/screens/UserInformation/';
import Store from '~/store/Store';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('<UserInformationScreen />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <SafeAreaProvider store={Store}>
          <UserInformationScreen />
        </SafeAreaProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
