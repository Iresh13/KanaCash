import 'react-native';
import React from 'react';

import Header from '~/components/ui/Header';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('<Header/>', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
