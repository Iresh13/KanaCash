import {View} from 'react-native';
import React from 'react';
import Success from '~/components/ui/Success';

// Note: test renderer must be required after react-native.
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

describe('<Success/>', () => {
  it('Success renders correctly', () => {
    const tree = renderer
      .create(
          <Success
            icon={<View/>}
            title={'title'}
            caption="CAption"
          />,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('renders success', () => {
    const wrapper = shallow(
      <Success
        icon={<View/>}
        title={'title'}
        caption="CAption"
      />
    );
    });
});
