import 'react-native';
import React from 'react';

import ExpandableBlock from '~/components/ui/ExpandableBlock';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('<ExpandableBlock/>', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<ExpandableBlock backgroundColor="red" title="title"
    caption="caption"/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
