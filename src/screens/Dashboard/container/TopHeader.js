import React from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {SemiBoldText, BoldText} from '~/components/ui/Text';
import theme from '~/components/theme/Style';
import {useNavigation} from '@react-navigation/native';
import {NAVIGATION_TO_SEND_MONEY_SCREEN} from '../../../navigation/routes';
import SendMoneyIcon from '../../../assets/svg/SendMoneyIcon.svg';

const Button = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.btnContainerStyle}
      onPress={() => navigation.navigate(NAVIGATION_TO_SEND_MONEY_SCREEN)}>
      <SemiBoldText text={'Send Money'} invert style={styles.btnText} />
      <SendMoneyIcon />
    </TouchableOpacity>
  );
};

export default function TopHeader({data}) {
  return (
    <View style={styles.container}>
      <SemiBoldText text="Hi," />
      <BoldText text={`${data?.user?.fullName}`} />
      <Button />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  btnContainerStyle: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: theme.defaultRadius,
    borderColor: theme.primaryColor,
    backgroundColor: theme.primaryColor,
    flexDirection: 'row',
    marginVertical: 10,
  },
  btnText: {
    marginRight: 10,
  },
  iconStyle: {
    width: 40,
    height: 40,
    // backgroundColor: 'red',
  },
});
