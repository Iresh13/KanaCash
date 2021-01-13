import 'react-native';
import React from 'react';

import {
  RegularText,
  MediumText,
  SemiBoldText,
  BoldText,
  LightText,
} from '~/components/ui/Text';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('<Text/>', () => {
  it('RegularText renders correctly', () => {
    const tree = renderer.create(<RegularText />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('MediumText renders correctly', () => {
    const tree = renderer.create(<MediumText />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('SemiBoldText renders correctly', () => {
    const tree = renderer.create(<SemiBoldText />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('BoldText renders correctly', () => {
    const tree = renderer.create(<BoldText />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('LightText renders correctly', () => {
    const tree = renderer.create(<LightText />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
