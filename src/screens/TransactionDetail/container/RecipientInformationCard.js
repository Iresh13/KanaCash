import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {MediumText, LightText} from '~/components/ui/Text';
import theme from '~/components/theme/Style';
import {DebitCardIcon} from '~/components/ui/Icon';
import Card from './Card';
import {useNavigation, StackActions} from '@react-navigation/native';
import {layoutAnimation} from '~/presentation';

export default function SenderInformationCard({data, review}) {
  const navigation = useNavigation();
  const [toggle, setToggle] = React.useState(false);

  const beneficiary = data.beneficiary;
  const payer = beneficiary.payer;
  const bank = beneficiary.bank;

  const onPressChangeCard = () => {
    const pushAction = StackActions.push('AddBeneficiaryDetails', {
      routeFrom: 'review',
    });
    navigation.dispatch(pushAction);
  };

  const onPressToggle = () => {
    setToggle(!toggle);
    layoutAnimation();
  };

  return (
    <Card title={'Recipient Information'}>
      <View style={styles.topView}>
        <MediumText text={beneficiary.fullName} style={styles.primaryText} />
        <TouchableOpacity onPress={onPressToggle}>
          {toggle ? (
            <Icon name="md-remove-circle-outline" size={24} />
          ) : (
            <Icon name="md-add-circle-outline" size={24} />
          )}
        </TouchableOpacity>
      </View>
      {toggle && (
        <>
          <LightText
            text={`${beneficiary?.address.postalCode}, ${
              beneficiary.address.address ? beneficiary.address.address1 : ''
            }`}
          />
          <LightText
            text={`${beneficiary?.address.state}, ${beneficiary?.address.city}`}
          />
          <LightText text={beneficiary?.address.country} />
          <View style={styles.seperator} />
          <MediumText text="Payout Method" style={styles.primaryText} />
          <View style={[styles.rowGroup, styles.seperator]}>
            <DebitCardIcon />
            <LightText
              text={` ${data.payoutMethod.replace('_', ' ')}`}
              style={styles.boldText}
            />
            {review && (
              <TouchableOpacity onPress={onPressChangeCard}>
                <LightText
                  text={'change'}
                  style={[styles.redText, {marginHorizontal: 10}]}
                />
              </TouchableOpacity>
            )}
          </View>
          {payer && <PayerCard data={payer} />}
          {bank && <BankCard data={bank} />}
        </>
      )}
    </Card>
  );
}

const PayerCard = ({data}) => {
  return (
    <View>
      <LightText text={data.name} style={styles.boldText} />
      <LightText text={`${data.address}, ${data.country}`} />
      <View style={styles.rowGroup}>
        <LightText
          text="Branch Code: "
          style={[styles.primaryText, styles.boldText]}
        />
        <LightText text={data.code} />
      </View>
    </View>
  );
};

const BankCard = ({data}) => {
  return (
    <View>
      {/* <View style={[styles.rowGroup, styles.seperator]}>
        <DebitCardIcon />
        <LightText text="  Debit Card" style={styles.boldText} />
      </View> */}
      <LightText text={data.bankName} style={styles.boldText} />
      <View style={styles.rowGroup}>
        <LightText
          text="Account Number: "
          style={[styles.primaryText, styles.boldText]}
        />
        <LightText text={data.accountNumber} />
      </View>
      <View style={styles.rowGroup}>
        <LightText
          text="Account Type: "
          style={[styles.primaryText, styles.boldText]}
        />
        <LightText text={data.accountType} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topView: {
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
