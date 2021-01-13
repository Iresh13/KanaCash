import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {MediumText, LightText, RegularText} from '~/components/ui/Text';
import {
  EmailIcon,
  PhoneIcon,
  AddressIcon,
  TierIcon,
  Done,
  RefreshIcon,
} from '~/components/ui/Icon';
import theme from '~/components/theme/Style';

const Row = ({icon, label}) => {
  return (
    <View style={styles.row}>
      <View style={styles.iconStyle}>{icon}</View>
      <RegularText text={label} />
    </View>
  );
};

export default function Card({isVerified, onPressVerify, data, status}) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <MediumText text={data?.fullName} style={styles.primaryText} />
        {status.kycStatus === 'SUSPENDED' ? (
          <LightText text="Suspended" style={styles.redText} />
        ) : !isVerified ? (
          <TouchableOpacity
            style={styles.verificationWrapper}
            onPress={onPressVerify}>
            <RefreshIcon />
            <LightText text="Verify here" style={styles.redText} />
          </TouchableOpacity>
        ) : (
          <View style={styles.verificationWrapper}>
            <Done text="Verified" style={styles.redText} />
          </View>
        )}
      </View>
      <Row icon={<EmailIcon />} label={data?.email} />
      <Row icon={<PhoneIcon />} label={data?.phoneNumber} />
      <Row
        icon={<AddressIcon />}
        label={`${data?.address?.state}, ${data?.address?.country}`}
      />
      <Row icon={<TierIcon />} label={status?.currentTier} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 3,
    marginBottom: 20,
    borderColor: theme.lightGrey,
    borderWidth: 1,
  },
  primaryText: {
    color: theme.primaryColor,
  },
  redText: {
    color: theme.red,
    marginLeft: 10,
  },
  row: {flexDirection: 'row', marginVertical: 5, alignItems: 'center'},
  iconStyle: {
    width: 30,
    height: 25,
  },
  verificationWrapper: {
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
