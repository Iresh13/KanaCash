import 'react-native';
import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import PersonalInformation from '~/screens/PersonalInformation';
import Store from '~/store/Store';

// Note: test renderer must be required after react-native.
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

describe('<PersonalInformation/>', () => {
  it('PersonalInformation renders correctly', () => {
    const tree = renderer
      .create(
        <SafeAreaProvider store={Store}>
          <PersonalInformation />,
        </SafeAreaProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
