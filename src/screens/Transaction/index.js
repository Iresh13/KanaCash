import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import GenericView from '~/components/ui/GenericView';
import {BoldText, LightText, MediumText} from '~/components/ui/Text';
import Header from '~/components/ui/Header';
import {Number} from '~/components/ui/Icon';
import theme from '~/components/theme/Style';
import * as api from '~/services/axios/Api';
import {
  createTransactionData,
  clearTransactionData,
} from '~/store/actions/TransactionAction';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {NAVIGATION_TO_TRANSACTION_DETAILS_SCREEN} from '../../navigation/routes';
import {TransactionList} from '~/screens/Shared';

export default function Transaction() {
  return (
    <GenericView padding isScrollable header={<Header title="Transactions" />}>
      <BoldText text="All Transaction" />
      <TransactionList />
    </GenericView>
  );
}

const styles = StyleSheet.create({
  amountWrapper: {
    marginTop: 10,
    marginBottom: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountText: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  listHeaderComponentStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  footerText: {
    color: theme.red,
  },
});
