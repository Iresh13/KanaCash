import 'react-native';
import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import AddBeneficiaryDetails from '~/screens/AddBeneficiaryDetails/';
import Store from '~/store/Store';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('<AddBeneficiaryDetails />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <SafeAreaProvider store={Store}>
          <AddBeneficiaryDetails />
        </SafeAreaProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
