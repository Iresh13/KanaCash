import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import GenericView from '~/components/ui/GenericView';
import Header from '~/components/ui/Header';
import {CommonActions} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import ExpandableBlock from '~/components/ui/ExpandableBlock';
import receiveMethod, {
  CASH_PICKUP,
  BANK_DEPOSIT,
  HOME_DELIVERY,
  WALLET,
} from '~/constants/receiveMethod';
import addReceiverDetail, {walletConfig} from '~/constants/addReceiverDetail';
import {
  NAVIGATION_TO_ADD_BENEFICIARY_DETAILS_SCREEN,
  NAVIGATION_TO_BENEFICIARY_SCREEN,
  NAVIGATION_TO_PAYOUT_METHOD_SCREEN,
} from '../../navigation/routes';
import {createTransactionData} from '~/store/actions/TransactionAction';
import {
  AddBeneficiarybank,
  AddCashPickUp,
  AddHomeDelivery,
  AddWallet,
} from './container';

export default function AddReceiveMethod({navigation, route}) {
  const dispatch = useDispatch();
  // const TransactionDetails = useSelector(state => state.transaction);
  const [selectedBlock, setSelectedBlock] = useState(undefined);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(undefined);

  const isRouteFromAddBeneficiaryDetails =
    route.params?.routeFrom === 'AddBeneficiaryDetails';

  console.log('route.params', route.params.beneficary);

  const country = route.params?.beneficary?.address.country;

  React.useEffect(() => {
    const {beneficary, selectedBlock: selectedBlockParams} = route.params;
    setSelectedBlock(selectedBlockParams);
    setSelectedBeneficiary(beneficary);
  }, [route.params]);

  // selectedBeneficiaryBank,
  const onPressContinue = (
    selectedBeneficiaryBank = null,
    selecetedPayer = null,
  ) => {
    if (isRouteFromAddBeneficiaryDetails) {
      const beneficiary = {
        ...selectedBeneficiary,
      };
      const transactionDetail = {
        recipientId: selectedBeneficiary.referenceId, //ID of beneficiary
        recipientBankId:
          selectedBeneficiaryBank !== null
            ? selectedBeneficiaryBank.referenceId
            : '', // ID obtained from /v1/senders/beneficiaries/bank
        payerId: selecetedPayer !== null ? selecetedPayer.referenceId : '', //ID obtained from /v1/payers",
        payer: selecetedPayer,
        payoutMethod: selectedBlock,
        beneficiary: beneficiary,
        BeneficiaryBank: selectedBeneficiaryBank,
      };

      console.log('transactionDetail', transactionDetail);
      dispatch(createTransactionData(transactionDetail));
      navigation.navigate(NAVIGATION_TO_PAYOUT_METHOD_SCREEN, {
        routeFrom: 'AddBeneficiaryDetails',
      });
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          key: null,
          routes: [{name: NAVIGATION_TO_BENEFICIARY_SCREEN}],
        }),
      );
    }
  };

  // const onChangeBeneficiaryBank = value => {
  //   const selectedValue = selectedBeneficiary.banks.find(
  //     item => item.bankName === value,
  //   );
  //   setSelectedBeneficiaryBank(selectedValue);
  // };

  const onPressBack = () => {
    if (isRouteFromAddBeneficiaryDetails) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          key: null,
          routes: [{name: NAVIGATION_TO_ADD_BENEFICIARY_DETAILS_SCREEN}],
        }),
      );
    } else {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          key: null,
          routes: [{name: NAVIGATION_TO_BENEFICIARY_SCREEN}],
        }),
      );
    }
  };

  const renderBlock = blockType => {
    var block = null;
    switch (blockType) {
      case CASH_PICKUP:
        block = (
          <AddCashPickUp
            pickerValue={'name'}
            default={false}
            onPressContinue={res => onPressContinue(null, res)}
            onPressBack={onPressBack}
          />
        );
        break;
      case BANK_DEPOSIT:
        block = (
          <AddBeneficiarybank
            beneficiaryId={selectedBeneficiary.referenceId}
            onPressContinue={res => onPressContinue(res)}
            onPressBack={onPressBack}
            countryCode={route.params.beneficary.address.country}
          />
        );
        break;
      case HOME_DELIVERY:
        block = (
          <AddHomeDelivery
            onPressContinue={res => onPressContinue(null, res)}
          />
        );
        break;
      case WALLET:
        block = (
          <AddWallet
            beneficiaryId={selectedBeneficiary.referenceId}
            onPressContinue={res => onPressContinue(res)}
            identificationNumber={route.params?.beneficary?.phoneNumber}
          />
        );
        break;
      default:
        block = null;
    }
    return block;
  };

  console.log('selectedBlock', selectedBlock);

  const renderExpandableBlock = renderMethod => {
    const data = renderMethod.find(item => item.payoutMethod === selectedBlock);
    return (
      <ExpandableBlock
        containerStyle={styles.blockContainer}
        leftContent={data?.icon}
        title={data?.title}
        caption={
          selectedBlock === 'WALLET' ? walletConfig(country) : data?.caption
        }
        content={renderBlock(selectedBlock)}
      />
    );
  };

  return (
    <GenericView padding header={<Header title="Add Receiver Details" />}>
      {renderExpandableBlock(
        isRouteFromAddBeneficiaryDetails ? receiveMethod : addReceiverDetail,
      )}
    </GenericView>
  );
}

const styles = StyleSheet.create({
  kyeboardAwareViewContainer: {flex: 1},
  headerText: {
    marginBottom: 15,
  },

  blockContainer: {
    marginVertical: 10,
  },

  contentContainerStyle: {
    minHeight: '100%',
    paddingBottom: 70,
  },
  continueBtn: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 18,
  },
});
