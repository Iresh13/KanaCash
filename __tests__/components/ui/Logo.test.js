import 'react-native';
import React from 'react';

import Logo from '~/components/ui/Logo';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('<Logo/>', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Logo />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
