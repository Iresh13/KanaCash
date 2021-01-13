import 'react-native';
import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import BeneficiarySuccess from '~/screens/BeneficiarySuccess';
import Store from '~/store/Store';

// Note: test renderer must be required after react-native.
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

describe('< BeneficiarySuccess/>', () => {
  it('BeneficiarySuccess renders correctly', () => {
    const tree = renderer
      .create(
        <SafeAreaProvider store={Store}>
          <BeneficiarySuccess />,
        </SafeAreaProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders success', () => {
    const wrapper = shallow(<BeneficiarySuccess />);
    expect(wrapper.find('Success').exists()).toEqual(true);
  });
});
