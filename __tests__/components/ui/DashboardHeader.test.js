import 'react-native';
import React from 'react';

import DashboardHeader from '~/components/ui/DashboardHeader';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('<DashboardHeader/>', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<DashboardHeader name="Joe Doe"/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
