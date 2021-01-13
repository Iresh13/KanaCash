import 'react-native';
import React from 'react';

import {
  SvgLogo,
  HeaderBgSVG,
  HeaderLogo,
  ButtonSvgBg,
  ButtonShadowView,
  VerifiedSvg,
  ThumbsUp,
} from '~/components/ui/Image';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('<Image/>', () => {
  it('SvgLogo renders correctly', () => {
    const tree = renderer.create(<SvgLogo />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('HeaderBgSVG renders correctly', () => {
    const tree = renderer.create(<HeaderBgSVG />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('HeaderLogo renders correctly', () => {
    const tree = renderer.create(<HeaderLogo />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('ButtonSvgBg renders correctly', () => {
    const tree = renderer.create(<ButtonSvgBg />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('ButtonShadowView renders correctly', () => {
    const tree = renderer.create(<ButtonShadowView />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('VerifiedSvg Icon renders correctly', () => {
    const tree = renderer.create(<VerifiedSvg />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('ThumbUp success icon render correctly', () => {
    const tree = renderer.create(<ThumbsUp />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
