import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {clearTransactionData} from '~/store/actions/TransactionAction';
import {BoldText, RegularText} from '~/components/ui/Text';
import Button from '~/components/ui/Button';
import theme from '~/components/theme/Style';
import {ThumbsUp} from '~/components/ui/Image';
import GenericView from '~/components/ui/GenericView';
import {NAVIGATION_TO_DASHBOARD_SCREEN} from '../../navigation/routes';
import Header from '~/components/ui/Header';

export default function TransactionSuccess({navigation}) {
  const dispatch = useDispatch();
  const transaction = useSelector(state => state.transaction);

  const onPressContinue = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        key: null,
        routes: [{name: NAVIGATION_TO_DASHBOARD_SCREEN}],
      }),
    );
    dispatch(clearTransactionData());
  };

  return (
    <GenericView header={<Header />}>
      <View style={styles.containerStyle}>
        <ThumbsUp />
        <BoldText text={'Congratulations!'} style={styles.titleText} />
        <RegularText
          style={[styles.textCenter, styles.blueText]}
          text="Your money transfer is on its way to"
        />
        <BoldText
          style={[styles.textCenter, styles.blueText]}
          text={transaction.beneficiary?.fullName}
        />
        <RegularText
          style={[styles.textCenter, styles.bottomText]}
          text="Please go to your dashboard to view your receipt and other details. We will send you an email with your receipt and notification after the transaction is delivered."
        />
        <Button
          text={'Back to Dashboard'}
          onPress={onPressContinue}
          style={[styles.loginBtn]}
        />
      </View>
    </GenericView>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    marginVertical: 10,
    color: theme.green,
  },
  descriptionText: {
    marginBottom: 25,
    textAlign: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  blueText: {
    color: theme.primaryColor,
  },
  loginBtn: {},
  bottomText: {
    margin: 15,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
});
