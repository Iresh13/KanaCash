import 'react-native';
import React from 'react';
import {
  CalendarIcon,
  DashboardIcon,
  ClockIcon,
  HomeIcon,
  HamburgerSvgIcon,
  ProfileIcon,
  LogoutIcon,
  CloseIconDrawer,
  EditProfileIcon,
} from '~/components/ui/Icon';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('<Icon/>', () => {
  it('CalendarIcon renders correctly', () => {
    const tree = renderer.create(<CalendarIcon />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('DashboardIcon renders correctly', () => {
    const tree = renderer.create(<DashboardIcon />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('ClockIcon renders correctly', () => {
    const tree = renderer.create(<ClockIcon />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('HomeIcon renders correctly', () => {
    const tree = renderer.create(<HomeIcon />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('HamburgerSvgIcon renders correctly', () => {
    const tree = renderer.create(<HamburgerSvgIcon />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('ProfileIcon renders correctly', () => {
    const tree = renderer.create(<ProfileIcon />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('LogoutIcon renders correctly', () => {
    const tree = renderer.create(<LogoutIcon />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('CloseIconDrawer renders correctly', () => {
    const tree = renderer.create(<CloseIconDrawer />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('EditProfileIcon renders correctly', () => {
    const tree = renderer.create(<EditProfileIcon />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
