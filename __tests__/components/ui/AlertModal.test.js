import 'react-native';
import React from 'react';

import AlertModal from '~/components/ui/AlertModal';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('<AlertModal/>', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <AlertModal visible={true}
        title="title"
        message="message"
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
