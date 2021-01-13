import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {MediumText, LightText} from '~/components/ui/Text';
import theme from '~/components/theme/Style';
import {DebitCardIcon, OnlineBankingIcon} from '~/components/ui/Icon';
import Card from './Card';
import {useNavigation, StackActions} from '@react-navigation/native';
import {layoutAnimation} from '~/presentation';

export default function SenderInformationCard({
  data,
  userInfo,
  paymentMethod,
  review,
}) {
  const navigation = useNavigation();
  const [toggle, setToggle] = React.useState(false);

  const onPressChangeCard = () => {
    const pushAction = StackActions.push('PayoutMethod', {
      routeFrom: 'review',
    });
    navigation.dispatch(pushAction);
  };

  const onPressToggle = () => {
    setToggle(!toggle);
    layoutAnimation();
  };

  return (
    <Card title={'Sender Information'}>
      <View style={styles.topRow}>
        <View>
          <MediumText text={userInfo.fullName} style={styles.primaryText} />
          <LightText
            text={`${userInfo.address.state}, ${userInfo.address.country}`}
          />
        </View>
        <TouchableOpacity onPress={onPressToggle}>
          {toggle ? (
            <Icon name="md-remove-circle-outline" size={24} />
          ) : (
            <Icon name="md-add-circle-outline" size={24} />
          )}
        </TouchableOpacity>
      </View>
      {toggle && (
        <React.Fragment>
          <View style={styles.seperator} />
          <MediumText text="Payment Method" style={styles.primaryText} />
          <View style={[styles.rowGroup, styles.seperator]}>
            <React.Fragment>
              {data.fundingSource === 'BANK' ? (
                <React.Fragment>
                  <OnlineBankingIcon />
                  <LightText text="  Online Banking" style={styles.boldText} />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <DebitCardIcon />
                  <LightText text="  Debit Card" style={styles.boldText} />
                </React.Fragment>
              )}
            </React.Fragment>

            {review && (
              <TouchableOpacity onPress={onPressChangeCard}>
                <LightText
                  text={`change`}
                  style={[styles.redText, {marginHorizontal: 10}]}
                />
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.rowGroup}>
            {paymentMethod?.accountHolderName && (
              <LightText
                text={paymentMethod?.accountHolderName}
                style={styles.boldText}
              />
            )}
            {/* <LightText text="X-3031" style={styles.boldText} /> */}
          </View>
          {paymentMethod?.name && (
            <LightText text={paymentMethod?.name} style={styles.boldText} />
          )}
          {/* <View style={styles.rowGroup}>
            <LightText text="Expiry: " style={styles.boldText} />
            <LightText text="Dec 2021" style={styles.boldText} />
          </View>
          <View style={styles.rowGroup}>
            <LightText text="Security Code: " style={styles.boldText} />
            <LightText text="xxx" style={styles.boldText} />
          </View> */}
        </React.Fragment>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryText: {color: theme.primaryColor},
  seperator: {marginVertical: 10},
  rowGroup: {flexDirection: 'row', alignItems: 'center'},
  boldText: {fontWeight: 'bold'},
  redText: {
    color: theme.red,
    fontWeight: 'bold',
    lineHeight: 27,
  },
});
