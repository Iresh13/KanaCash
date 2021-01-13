import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {RegularText, MediumText} from '~/components/ui/Text';
import {OutlinePerson, Done, RedPlus, CloseIcon} from '~/components/ui/Icon';
import theme from '~/components/theme/Style';

export default function BeneficiaryCard({
  item,
  onPressAddPayoutMethod,
  onPressEdit,
}) {
  const isHomeDeliveryEnabled = item.address.state === 'Yerevan';
  return (
    <View style={styles.container}>
      <View style={styles.cardWrapper}>
        <View style={styles.rowWrapper}>
          <OutlinePerson />
          <View style={styles.contentWrapper}>
            <MediumText text={`${item.fullName}`} style={styles.headerText} />
            {item.email && <RegularText text={item.email} />}
            <RegularText text={item.phoneNumber} />
            {item?.address?.addressLine1 ? (
              <RegularText text={item.address.addressLine1} />
            ) : null}
            <RegularText
              text={`${item.address.city}, ${item.address.country}`}
            />
          </View>
          <TouchableOpacity style={styles.edit} onPress={onPressEdit}>
            <RegularText text="Edit" invert />
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <View style={styles.footerRow}>
            <View style={styles.footerContent}>
              <RegularText text="Bank Deposit" style={styles.footerText} />
              <RegularText text={item.banks.length} style={styles.footerText} />
            </View>
            <View style={styles.divider} />
            <View style={styles.footerContent}>
              <RegularText text="Cash Pickup" style={styles.footerText} />
              {item.isCashPickupEnabled ? (
                <Done />
              ) : (
                <CloseIcon size={20} color={'red'} />
              )}
            </View>
            <View style={styles.divider} />
            <View style={styles.footerContent}>
              <RegularText text="Home Delivery" style={styles.footerText} />
              {isHomeDeliveryEnabled ? (
                <Done />
              ) : (
                <CloseIcon size={20} color={'red'} />
              )}
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.bottom} onPress={onPressAddPayoutMethod}>
        <MediumText text="Add New Payout Method" style={styles.bottomText} />
        <RedPlus />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  cardWrapper: {
    borderWidth: 1,
    borderRadius: theme.defaultRadius,
    borderColor: '#B6C0C9',
  },
  rowWrapper: {
    padding: 15,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#B6C0C9',
  },
  contentWrapper: {
    marginHorizontal: 15,
    flex: 3,
  },
  headerText: {
    marginBottom: 10,
  },
  edit: {
    borderRadius: 50,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: theme.green,
  },
  footer: {},
  footerRow: {
    // padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 5,
  },
  footerText: {
    fontWeight: '500',
    color: theme.primaryColor,
    textAlign: 'center',
  },
  divider: {
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  bottom: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomText: {marginRight: 10, color: theme.red},
});
