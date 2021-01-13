import 'react-native';
import React from 'react';

import Block from '~/components/ui/Block';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('<Block/>', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Block backgroundColor="red" title="title"
    caption="caption"/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
