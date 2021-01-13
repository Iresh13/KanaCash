import 'react-native';
import React from 'react';

import BeneficiaryCard from '~/components/ui/BeneficiaryCard';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const mock_item = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@yopmail.com',
  phoneNumber: '11111',
  address: {addressLine1: '11111', city: 'new', country: 'usa'},
  banks: [],
  isCashPickupEnabled: true,
};

describe('<BeneficiaryCard/>', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<BeneficiaryCard item={mock_item} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
