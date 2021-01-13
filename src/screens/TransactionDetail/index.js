import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import GenericView from '~/components/ui/GenericView';
import Header from '~/components/ui/Header';
import FooterButton from '~/components/ui/FooterButton';
import {
  TransactionDetailCard,
  SenderInformationCard,
  RecipientInformationCard,
  // RemittanceCard,
  ReviewWrapper,
  DetailsWrapper,
} from './container';
import AlertModal from '~/components/ui/AlertModal';
import {useSelector, useDispatch} from 'react-redux';
import {createTransactionData} from '~/store/actions/TransactionAction';
import * as api from '~/services/axios/Api';
import {NAVIGATION_TO_TRANSACTION_CONFIRMATION_SCREEN} from '../../navigation/routes';
import {PHONE_NUMBER, EMAIL} from '~/constants/info';

export default function TransactionDetail({navigation, route}) {
  const dispatch = useDispatch();
  const transaction = useSelector(state => state.transaction);
  const userData = useSelector(state => state.auth.user);
  const [paymentMethod, setPaymentMethod] = useState({});

  const [alertModalVisible, setAlertModalVisible] = React.useState(false);
  const [messageModalVisible, setMessageModalVisible] = React.useState(false);
  const [transactionMessage, setTransactionMessage] = useState('');
  const [cancelingTransaction, setCancelingTransaction] = useState(false);

  const [isTransactionCancelled, setTransactionCancelled] = useState(false);

  const review = route?.params?.routeFrom;

  const roundUp = (value, decimals) => {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  };

  useFocusEffect(
    React.useCallback(() => {
      if (review) {
        const feeAmount = transaction.transactionFee.find(
          item =>
            item.paymentMethod === transaction.paymentMethod &&
            item.payoutMethod === transaction.payoutMethod,
        );

        const feeRange = feeAmount.feeRanges;

        let feeAmountCal = 0;
        if (feeAmount.feeRanges) {
          feeAmountCal =
            feeAmount.feeRanges.flatFee +
            (transaction.senderAmount * feeAmount.feeRanges.percentageFee) /
              100;
        }

        const updateTransactionDetails = {
          feeRange,
          feeAmount: roundUp(feeAmountCal, 2),
        };

        dispatch(createTransactionData(updateTransactionDetails));
      }
    }, [review, transaction.paymentMethod, transaction.payoutMethod]),
  );

  React.useEffect(() => {
    api.getBanks().then(res => {
      if (res.status === 200) {
        const filterData = res.data.result.find(
          item => item.id === transaction.senderFundingSourceAccountId,
        );
        setPaymentMethod(filterData);
      }
    });
  }, [transaction.senderFundingSourceAccountId]);

  /**
   *check for minimum amount to be send by sender
   */
  const onSaveAndContinue = () => {
    // feeAmount
    // senderAmount
    // if (transaction.senderAmount >= transaction.feeRange.minAmount) {
    navigation.navigate(NAVIGATION_TO_TRANSACTION_CONFIRMATION_SCREEN);
    // } else {
    //   let modalConfig = {
    //     message: `Transaction Amount should be greater than ${
    //       transaction.feeRange.minAmount
    //     }`,
    //     message_title: `Sorry`,
    //   };
    //   dispatch(setError(modalConfig));
    // }
  };

  const onPressCancelTransaction = () => {
    setCancelingTransaction(true);
    api
      .cancelTransaction(transaction.referenceId)
      .then(res => {
        console.log('res', res);
        if (res.status === 200) {
          setTransactionMessage(
            'Your Transaction has been cancel successfully',
          );
          setTransactionCancelled(true);
        } else {
          setTransactionMessage(
            `Transaction cannot be canceled, please contact customer support at \n(email: ${EMAIL}) or phone \nno: ${PHONE_NUMBER}`,
          );
          setTransactionCancelled(false);
        }
        setCancelingTransaction(false);
        setMessageModalVisible(true);
      })
      // eslint-disable-next-line handle-callback-err
      .catch(err => {
        setCancelingTransaction(false);
        setMessageModalVisible(true);
      });
  };

  const onPressOk = () => {
    setAlertModalVisible(false);
    onPressCancelTransaction();
  };

  return (
    <GenericView
      loading={cancelingTransaction}
      padding
      scrollable
      header={
        <Header
          title={review ? 'Review' : 'Transaction Details'}
          backButtonVisible={!review}
        />
      }>
      {review ? (
        <ReviewWrapper />
      ) : (
        <DetailsWrapper
          isTransactionCancelled={isTransactionCancelled}
          transaction={transaction}
          onPressCloseIcon={() => setAlertModalVisible(!alertModalVisible)}
        />
      )}

      <TransactionDetailCard data={transaction} review={review} />
      <SenderInformationCard
        data={transaction}
        userInfo={userData}
        paymentMethod={paymentMethod}
        review={review}
      />
      <RecipientInformationCard data={transaction} review={review} />
      {/* <RemittanceCard /> */}

      {review && (
        <FooterButton
          text="Submit & Continue"
          onPress={onSaveAndContinue}
          style={styles.continueBtn}
        />
      )}

      {alertModalVisible && (
        <AlertModal
          message="Are you sure you want to cancel the transaction?"
          visible={alertModalVisible}
          onPressOk={onPressOk}
          onRequestClose={() => setAlertModalVisible(!alertModalVisible)}
        />
      )}

      {messageModalVisible && (
        <AlertModal
          title="Message"
          message={transactionMessage}
          visible={messageModalVisible}
          onPressOk={() => setMessageModalVisible(false)}
          onRequestClose={() => setMessageModalVisible(false)}
          closeButton={'Close'}
        />
      )}
    </GenericView>
  );
}

const styles = StyleSheet.create({
  continueBtn: {
    marginBottom: 20,
  },
});
