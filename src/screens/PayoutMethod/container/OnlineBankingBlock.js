import React from 'react';
import {View, StyleSheet} from 'react-native';
import theme from '~/components/theme/Style';
import PickerModal from '~/components/ui/PickerModal';
import AddNewCard from './AddNewCard';
import Box from './Box';
import {useNavigation} from '@react-navigation/native';
import widgetType from '~/constants/widgetType';
import {NAVIGTION_TO_WIDGETS_SCREEN} from '../../../navigation/routes';

export default function OnlineBanking({
  data,
  extraData,
  pickerValue,
  onValueChange,
  ...pickerProps
}) {
  const navigation = useNavigation();

  const navigateToWidget = () => {
    navigation.navigate(NAVIGTION_TO_WIDGETS_SCREEN, {
      widgetType: widgetType.bank,
    });
  };

  return (
    <View style={styles.container}>
      <PickerModal
        onPressEmptyPicker={navigateToWidget}
        label="Select from added banks"
        pickOptions={data}
        placeholder="Select"
        pickerValue={pickerValue}
        onValueChange={onValueChange}
        inputParentStyles={styles.inputParentStyle}
        {...pickerProps}
      />
      {extraData ? (
        <Box
          titleFirst="Bank"
          titleSecond="Account Holder"
          titleThird="Account Type"
          first={extraData.name}
          second={extraData.accountHolderName}
          third={extraData.accountType}
        />
      ) : (
        <></>
      )}
      <AddNewCard
        routeName={'AddBank'}
        text="add a new bank"
        onPress={navigateToWidget}
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
