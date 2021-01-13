/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {SemiBoldText, RegularText} from '~/components/ui/Text';
import theme from '~/components/theme/Style';
import {useNavigation, StackActions} from '@react-navigation/native';

export default function TransactionDetailCard({data, review}) {
  const navigation = useNavigation();
  const senderCurrency = data.senderCurrency
    ? data.senderCurrency
    : data.recipientCurrency;
  const senderAmount = data.senderAmount;
  const recipientCurrency = data.recipientCurrency;
  const recipientAmount = data.recipientAmount;

  const totalAmount = parseFloat(senderAmount) + parseFloat(data.feeAmount);

  const onPressEditSendMoney = () => {
    const pushAction = StackActions.push('SendMoney', {routeFrom: 'review'});
    navigation.dispatch(pushAction);
  };

  console.log('data', data);

  return (
    <View style={styles.transactionDetailCard}>
      <SemiBoldText text="Transaction Details" style={styles.headerText} />
      <View style={styles.transactionRowGroup}>
        <View style={{flexDirection: 'row'}}>
          <RegularText text="Send Amount" style={styles.titleText} />
          {review && (
            <TouchableOpacity onPress={onPressEditSendMoney}>
              <RegularText
                text="Edit"
                style={[styles.redText, {marginHorizontal: 10}]}
              />
            </TouchableOpacity>
          )}
        </View>
        <RegularText
          text={`${senderCurrency} ${senderAmount}`}
          style={styles.boldText}
        />
      </View>
      <View style={styles.transactionRowGroup}>
        <RegularText text="Transaction Fee" style={styles.titleText} />
        <RegularText
          text={`${senderCurrency} ${data.feeAmount &&
            data.feeAmount.toFixed(2)}`}
          style={styles.boldText}
        />
      </View>
      <View style={styles.transactionRowGroup}>
        <RegularText text="Total Amount" style={styles.titleText} />
        <RegularText
          text={`${senderCurrency} ${totalAmount.toFixed(2)}`}
          style={styles.redText}
        />
      </View>
      <View style={styles.divider} />
      <View style={styles.transactionRowGroup}>
        <RegularText text="Receive Amount" style={styles.titleText} />
        <RegularText
          text={`${recipientAmount} ${recipientCurrency}`}
          style={styles.boldText}
        />
      </View>
      <View style={styles.transactionRowGroup}>
        <RegularText text="Exchange Rate" style={styles.titleText} />
        <RegularText
          text={`${'1'} ${senderCurrency} = ${
            data.exchangeRate
          } ${recipientCurrency}`}
          style={styles.boldText}
        />
      </View>
      <View style={styles.transactionRowGroup}>
        <RegularText text="Payment Type" style={styles.titleText} />
        <RegularText
          text={`${
            data.paymentMethod
              ? data.paymentMethod.replace('_', ' ')
              : data.fundingSource
          }`}
          style={styles.boldText}
        />
      </View>
      <View style={styles.transactionRowGroup}>
        <RegularText text="Receive Type" style={styles.titleText} />
        <RegularText
          text={data.payoutMethod.replace('_', ' ')}
          style={styles.boldText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  transactionDetailCard: {
    backgroundColor: 'rgba(14, 60, 101, 0.05)',
    padding: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 3,
    marginBottom: 20,
  },
  headerText: {marginBottom: 10, color: theme.primaryColor},
  transactionRowGroup: {
    // marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleText: {
    fontWeight: '500',
    lineHeight: 27,
  },
  boldText: {fontWeight: 'bold', lineHeight: 27, color: 'black'},
  redText: {
    color: theme.red,
    fontWeight: 'bold',
    lineHeight: 27,
  },
  divider: {borderWidth: StyleSheet.hairlineWidth, marginVertical: 20},
});
