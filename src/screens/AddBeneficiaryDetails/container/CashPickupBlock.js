import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RegularText} from '~/components/ui/Text';
import theme from '~/components/theme/Style';
import PickerModal from '~/components/ui/PickerModal';

export default function CashPickupBlock({data, ...pickerProps}) {
  return (
    <View style={styles.container}>
      <RegularText
        text={'Where do you want the beneficiary to pick up the cash from?'}
        style={styles.headerText}
      />
      <PickerModal
        label="Cash Pickup Location"
        pickOptions={data}
        placeholder="Select"
        inputParentStyles={styles.inputParentStyle}
        {...pickerProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputParentStyle: {
    marginBottom: 20,
  },
  headerText: {
    color: theme.primaryColor,
    fontWeight: '500',
    marginBottom: 20,
  },
});
