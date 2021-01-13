import React from 'react';
import {SafeAreaProvider, View} from 'react-native-safe-area-context';
import GenericView from '~/components/ui/GenericView';
import Store from '~/store/Store';

import renderer from 'react-test-renderer';

describe('<GenericView/>', () => {
  it('GenericView renders correctly', () => {
    const tree = renderer
      .create(
        <SafeAreaProvider store={Store}>
          <GenericView><View/></GenericView>,
        </SafeAreaProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
