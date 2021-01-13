import React from 'react';
import {StyleSheet} from 'react-native';
import GenericView from '~/components/ui/GenericView';
import {MediumText} from '~/components/ui/Text';
import Button from '~/components/ui/Button';
import Header from '~/components/ui/Header';
import {ProfileCard} from './container';
import {getCurrentUser} from '~/store/actions/UserDetailsAction';
import {useDispatch, useSelector} from 'react-redux';
import widgetType from '~/constants/widgetType';
import {
  NAVIGTION_TO_WIDGETS_SCREEN,
  NAVIGATION_TO_CREATE_BENEFICIARY_SCREEN,
  NAVIGATION_TO_TIER_SCREEN,
} from '../../navigation/routes';
import {useFocusEffect} from '@react-navigation/native';

export default function PersonalInformation({navigation}) {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = dispatch(getCurrentUser());
      return () => unsubscribe;
    }, []),
  );

  return (
    <GenericView
      padding
      isScrollable
      header={<Header title="Personal Information" />}>
      <ProfileCard
        onPressVerify={() =>
          navigation.navigate(NAVIGTION_TO_WIDGETS_SCREEN, {
            widgetType: widgetType.kyc,
          })
        }
        data={userData.user}
        status={userData.status}
        isVerified={userData.status.isKYCVerified}
      />
      <MediumText
        text="To send more money, upgrade your transaction limit"
        style={styles.marginBottom}
      />
      {userData.status.isKYCVerified && (
        <Button
          text="Upgrade Limit"
          style={styles.marginBottom}
          // onPress={() =>
          //   navigation.navigate(NAVIGTION_TO_WIDGETS_SCREEN, {
          //     widgetType: widgetType.tier,
          //   })
          // }
          onPress={() =>
            navigation.navigate('Tier', {screen: NAVIGATION_TO_TIER_SCREEN})
          }
        />
      )}
      <Button
        text="Add the Beneficiary"
        style={styles.marginBottom}
        onPress={() =>
          navigation.navigate('Beneficiary', {
            screen: NAVIGATION_TO_CREATE_BENEFICIARY_SCREEN,
            params: {update: false},
          })
        }
      />
      {!userData?.status.isKYCVerified && (
        <Button
          text="Verify your Account"
          buttonInvert
          onPress={() =>
            navigation.navigate(NAVIGTION_TO_WIDGETS_SCREEN, {
              widgetType: widgetType.kyc,
            })
          }
          style={styles.marginBottom}
        />
      )}
    </GenericView>
  );
}

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 20,
  },
});
