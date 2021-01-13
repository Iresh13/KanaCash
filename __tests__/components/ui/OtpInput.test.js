import 'react-native';
import React from 'react';

import OtpInputs from '~/components/ui/OtpInputs';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('<OtpInputs/>', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<OtpInputs />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
