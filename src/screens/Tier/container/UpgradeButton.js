import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SemiBoldText} from '~/components/ui/Text';
import widgetType from '~/constants/widgetType';
import {NAVIGTION_TO_WIDGETS_SCREEN} from '../../../navigation/routes';

export default function UpgradeButton({onPress}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(NAVIGTION_TO_WIDGETS_SCREEN, {
          widgetType: widgetType.tier,
        })
      }
      style={styles.buttonStyle}>
      <SemiBoldText text={'Upgrade Tier'} invert />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#B31F31',
    borderRadius: 5,
  },
});
