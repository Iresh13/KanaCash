import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {MediumText} from '~/components/ui/Text';
import theme from '~/components/theme/Style';
import {TransactionList} from '~/screens/Shared';
import {NAVIGATION_TO_TRANSACTIONS_SCREEN} from '../../../navigation/routes';

const ProfileComplete = () => {
  const navigation = useNavigation();
  return (
    <TransactionList
      renderTotal
      ListHeaderComponent={
        <View style={styles.listHeaderComponentStyle}>
          <MediumText text="Recent transactions" />
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(NAVIGATION_TO_TRANSACTIONS_SCREEN)
            }>
            <MediumText text="View all" style={[styles.footerText]} />
          </TouchableOpacity>
        </View>
      }
    />
  );
};

export default ProfileComplete;

const styles = StyleSheet.create({
  listHeaderComponentStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  footerText: {
    color: theme.red,
  },
});
