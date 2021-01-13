import 'react-native';
import React from 'react';

import NTextInput from '~/components/ui/TextInput';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('<NTextInput/>', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<NTextInput />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
