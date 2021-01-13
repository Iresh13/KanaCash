import 'react-native';
import React from 'react';

import Button from '~/components/ui/Button';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('<Button/>', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
