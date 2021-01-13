import React from 'react';
import {VerifiedSvg} from '~/components/ui/Image';
import {useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import GenericView from '~/components/ui/GenericView';
import Success from '~/components/ui/Success';
import {
  NAVIGATION_TO_DRAWER,
  NAVIGATION_TO_USER_VERIFIED_SCREEN,
} from '../../navigation/routes';

export default function PhoneVerified({navigation}) {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const onPressContinue = () => {
    if (isAuthenticated) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          key: null,
          routes: [{name: NAVIGATION_TO_DRAWER}],
        }),
      );
    } else {
      navigation.navigate(NAVIGATION_TO_USER_VERIFIED_SCREEN);
    }
  };

  return (
    <GenericView>
      <Success
        onPress={onPressContinue}
        icon={<VerifiedSvg />}
        title={'Verified'}
        caption={
          'You have successfully verified your Phone \nnumber using the code'
        }
      />
    </GenericView>
  );
}
