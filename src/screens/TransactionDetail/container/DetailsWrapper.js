import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {RegularText, SemiBoldText} from '~/components/ui/Text';
import {CloseIcon} from '~/components/ui/Icon';
import checkTransactionStatus, {
  statusStyle,
} from '~/utils/checkTransactionStatus';
import Invoice from './Invoice';

export default function DetailsWrapper({
  transaction,
  isTransactionCancelled,
  onPressCloseIcon,
}) {
  const currentStatus = isTransactionCancelled
    ? 'CANCELED'
    : transaction.status;

  return (
    <React.Fragment>
      <SemiBoldText
        text={`Transaction of ${transaction.beneficiary.fullName}`}
      />
      <RegularText text={`Transaction Date: ${transaction.createdAt}`} />

      <View
        style={[styles.rowGroup, styles.spaceBetween, styles.marginVertical]}>
        <View style={styles.rowGroup}>
          <View style={styles.dotStyle(statusStyle(currentStatus))} />
          <RegularText
            text={currentStatus}
            style={styles.statusTextStyle(statusStyle(currentStatus))}
          />
        </View>
        {transaction.deliveryStatus !== 'CANCELED' &&
          (transaction.deliveryStatus !== 'PENDING' && (
            <Invoice transactionId={transaction.referenceId} />
          ))}
      </View>

      {isTransactionCancelled ? (
        <View style={styles.rowGroup}>
          <RegularText text={'This Transaction has been Canceled'} />
        </View>
      ) : transaction.status == 'INITIATED' ||
        transaction.status == 'PENDING' ? (
        <View style={styles.rowGroup}>
          <TouchableOpacity
            onPress={onPressCloseIcon}
            style={[styles.rowGroup]}>
            <CloseIcon color={'red'} />
            <RegularText text="  Cancel" />
          </TouchableOpacity>
        </View>
      ) : (
        transaction.status == 'CANCELED' && (
          <View style={styles.rowGroup}>
            <RegularText text={'This Transaction has been Canceled'} />
          </View>
        )
      )}
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  spaceBetween: {
    justifyContent: 'space-between',
  },
  rowGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeWrapper: {
    // marginLeft: 30,
  },
  continueBtn: {
    marginBottom: 20,
  },
  marginVertical: {
    marginVertical: 10,
  },
  dotStyle: statusColor => ({
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: statusColor,
    marginRight: 8,
  }),
  statusTextStyle: statusColor => ({
    color: statusColor,
  }),
});
