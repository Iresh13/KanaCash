import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RegularText} from '~/components/ui/Text';
import theme from '~/components/theme/Style';
import PickerModal from '~/components/ui/PickerModal';
import AddNewCard from './AddNewCard';
import Box from './Box';
import {useNavigation} from '@react-navigation/native';
import widgetType from '~/constants/widgetType';
import {NAVIGTION_TO_WIDGETS_SCREEN} from '../../../navigation/routes';

const bankOption = [
  {leaveType: 'bank 1'},
  {leaveType: 'bank 2'},
  {leaveType: 'bank 3'},
];

export default function DebitCard({
  data,
  extraData,
  pickerValue,
  onValueChange,
  ...pickerProps
}) {
  const navigation = useNavigation();

  const navigateToCardWidget = () => {
    navigation.navigate(NAVIGTION_TO_WIDGETS_SCREEN, {
      widgetType: widgetType.card,
    });
  };
  return (
    <View style={styles.container}>
      <RegularText
        text={'Select from added debit cards'}
        style={styles.headerText}
      />
      <PickerModal
        onPressEmptyPicker={navigateToCardWidget}
        label="Cash Pickup Location"
        pickOptions={data}
        placeholder="Select"
        pickerValue={pickerValue}
        onValueChange={onValueChange}
        inputParentStyles={styles.inputParentStyle}
        {...pickerProps}
      />
      {extraData ? (
        <Box
          titleFirst="Nick Name"
          titleSecond="Card"
          titleThird="Network"
          first={extraData.fundingSourceName}
          second={extraData.nickName}
          third={extraData.institutionName}
        />
      ) : (
        <></>
      )}
      <AddNewCard
        text={'add a new debit card'}
        onPress={navigateToCardWidget}
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
