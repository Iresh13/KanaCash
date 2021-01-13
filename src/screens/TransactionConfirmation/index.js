import React from 'react';
import {View, StyleSheet} from 'react-native';
import GenericView from '~/components/ui/GenericView';
import Header from '~/components/ui/Header';
import {useSelector, useDispatch} from 'react-redux';
import {setError} from '~/store/actions/Error';
import * as api from '~/services/axios/Api';
import {NAVIGATION_TO_TRANSACTION_SUCCESS_SCREEN} from '../../navigation/routes';
import {BoldText} from '~/components/ui/Text';
import FooterButton from '~/components/ui/FooterButton';
import theme from '~/components/theme/Style';
import {AUTHORIZATION} from '~/constants/info';
import {ScrollView} from 'react-native-gesture-handler';

export default function TransactionConfirmation({navigation}) {
  const dispatch = useDispatch();
  const transaction = useSelector(state => state.transaction);
  const [loading, setLoading] = React.useState(false);

  const onPressContinue = () => {
    const {
      feeAmount,
      exchangeRate,
      senderAmount,
      recipientAmount,
      recipientCurrency,
      destinationCountry,
      recipientId,
      payoutMethod,
      fundingSource,
      senderFundingAccountId,
      recipientBankId,
      payerId,
    } = transaction;

    const body = {
      feeAmount,
      exchangeRate,
      senderAmount,
      recipientAmount,
      recipientCurrency,
      destinationCountry,
      recipientId,
      payoutMethod,
      fundingSource,
      senderFundingAccountId,
      recipientAccountId: recipientBankId,
      payerId,
      remittancePurpose: 'other',
    };
    console.log('body', body);
    setLoading(true);
    api
      .createTransaction(body)
      .then(res => {
        console.log('response', res);
        if (res.status === 200) {
          setLoading(false);
          navigation.navigate(NAVIGATION_TO_TRANSACTION_SUCCESS_SCREEN);
        } else {
          let modalConfig = {
            message: res.data.message,
            message_title: 'Transaction Failed',
          };
          setLoading(false);
          dispatch(setError(modalConfig));
        }
      })
      // eslint-disable-next-line handle-callback-err
      .catch(err => {
        setLoading(false);
        let modalConfig = {
          message: err?.data?.message
            ? JSON.parse(err.data.message)?.message
            : 'Error while updating receiver',
          message_title: 'Transaction Failed',
        };
        dispatch(setError(modalConfig));
      });
  };

  return (
    <GenericView
      padding
      loading={loading}
      header={<Header title="Confirmation" />}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}>
        <View style={styles.containerStyle}>
          <BoldText text={'Authorization'} style={styles.titleText} />
          <AUTHORIZATION />
          <View style={styles.buttonWrapper}>
            <FooterButton text="Yes, Continue" onPress={onPressContinue} />
          </View>
        </View>
      </ScrollView>
    </GenericView>
  );
}

const styles = StyleSheet.create({
  contentContainerStyle: {flexGrow: 1, justifyContent: 'center'},
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    marginVertical: 10,
    color: theme.primaryColor,
    textAlign: 'center',
  },
  termContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  descriptionText: {
    fontFamily: theme.themeFontRegular,
    fontSize: theme.fontSizeRegular,
    lineHeight: 25,
    color: '#5C5C5C',
    textAlign: 'center',
  },
  buttonWrapper: {
    width: '60%',
  },
  boldText: {
    fontWeight: '700',
    color: '#1f1f1f',
  },
});
