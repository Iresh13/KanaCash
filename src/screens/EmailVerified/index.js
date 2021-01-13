import React from 'react';
import {useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {VerifiedSvg} from '~/components/ui/Image';
import GenericView from '~/components/ui/GenericView';
import Success from '~/components/ui/Success';
import {
  NAVIGATION_TO_DRAWER,
  NAVIGATION_TO_GET_STARTED_SCREEN,
} from '../../navigation/routes';

export default function EmailVerified({navigation}) {
  const userData = useSelector(state => state.auth);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  // const onPressContinue = () => {
  //   if (isAuthenticated) {
  //     if (userData.status.isPhoneNumberVerified) {
  //       navigation.dispatch(
  //         CommonActions.reset({
  //           index: 0,
  //           key: null,
  //           routes: [{name: NAVIGATION_TO_DRAWER}],
  //         }),
  //       );
  //     } else {
  //       navigation.navigate(NAVIGATION_TO_GET_STARTED_SCREEN);
  //     }
  //   } else {
  //     navigation.navigate(NAVIGATION_TO_GET_STARTED_SCREEN);
  //   }
  // };

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
        caption={'You have successfully verified your email \naddress'}
      />
    </GenericView>
  );
}
