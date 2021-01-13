import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import GenericView from '~/components/ui/GenericView';
import Header from '~/components/ui/Header';
import theme from '~/components/theme/Style';
import {SemiBoldText, MediumText} from '~/components/ui/Text';
import FooterButton from '~/components/ui/FooterButton';
import ExpandableBlock from '~/components/ui/ExpandableBlock';
import {Outline, Done} from '~/components/ui/Icon';
import {layoutAnimation} from '~/presentation';
import PickerModal from '~/components/ui/PickerModal';
import * as api from '~/services/axios/Api';
import {useSelector, useDispatch} from 'react-redux';
import {createTransactionData} from '~/store/actions/TransactionAction';
import {useFocusEffect} from '@react-navigation/native';
import checkAvailablePayoutMethod from '~/utils/checkAvailablePayoutMethod';
import receiveMethod, {
  CASH_PICKUP,
  BANK_DEPOSIT,
  HOME_DELIVERY,
  WALLET,
} from '~/constants/receiveMethod';
import {
  NAVIGATION_TO_TRANSACTION_DETAILS_SCREEN,
  NAVIGATION_TO_CREATE_BENEFICIARY_SCREEN,
  NAVIGATION_TO_PAYOUT_METHOD_SCREEN,
  NAVIGATION_TO_BENEFICIARY_SUCCESS_SCREEN,
} from '../../navigation/routes';
import {
  CashPickupBlock,
  BankDepositBlock,
  HomeDeliveryBlock,
  WalletBlock,
} from './container';

export default function AddBeneficiaryDetails({navigation, route}) {
  const dispatch = useDispatch();
  const transactionDetails = useSelector(state => state.transaction);
  const [beneficiaries, setBeneficiaries] = useState(undefined);
  const [payersList, setPayersList] = useState([]);
  const [banksList, setBanksList] = useState([]);

  const [selectedBlock, setSelectedBlock] = useState(undefined);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(undefined);
  const [selectedBeneficiaryBank, setSelectedBeneficiaryBank] = useState('');
  const [selectedBeneficiaryWallet, setSelectedBeneficiaryWallet] = useState(
    '',
  );
  const [selecetedPayer, setSelecetedPayer] = useState({});

  const [loading, setLoading] = useState(true);
  const [addBank, setAddBank] = useState(false);

  const review = route?.params?.routeFrom === 'review';

  React.useEffect(() => {
    if (!loading) {
      if (review) {
        const {
          payoutMethod,
          beneficiary,
          payer,
          BeneficiaryBank,
        } = transactionDetails;
        setSelectedBlock(payoutMethod);
        setSelectedBeneficiary(beneficiary);
        if (payoutMethod === CASH_PICKUP) {
          setSelecetedPayer(payer);
        } else if (payoutMethod === BANK_DEPOSIT) {
          setSelectedBeneficiaryBank(BeneficiaryBank);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const _getBeneficiaries = () => {
    api.getBeneficiaries().then(res => setBeneficiaries(res.data));
  };

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe = _getBeneficiaries();
      return () => unsubscribe;
    }, []),
  );

  React.useEffect(() => {
    setLoading(true);
    let getPayersList = null;
    let getBanksByCountry = null;
    const pymt = transactionDetails.destination.payoutMethod;
    if (checkAvailablePayoutMethod(pymt, 'isCashPickupEnabled')) {
      getPayersList = api.getPayersList(transactionDetails.destinationCountry);
    }
    if (checkAvailablePayoutMethod(pymt, 'isBankDepositEnabled')) {
      getBanksByCountry = api.getBanksByCountry(
        transactionDetails.destinationCountry,
      );
    }
    const unsubscribe = Promise.all([getPayersList, getBanksByCountry])
      .then(values => {
        getPayersList && setPayersList(values[0].data.result);
        getBanksByCountry && setBanksList(values[1].data.result);
        setLoading(false);
      })
      .then(error => setLoading(false));

    return () => unsubscribe;
  }, [
    transactionDetails.destination.payoutMethod,
    transactionDetails.destinationCountry,
  ]);

  const onChangePayers = payersValue => {
    const payersListFilter = payersList.find(item => item.name === payersValue);
    setSelecetedPayer(payersListFilter);
  };

  // Select Beneficiary name
  const onChangeBeneficiary = beneficiaryValue => {
    const filterBaneficiary = beneficiaries.result.find(
      item => item.fullName === beneficiaryValue,
    );
    setSelectedBeneficiary(filterBaneficiary);
    onSelectBlock(undefined);
    layoutAnimation();
    setSelectedBeneficiaryBank('');
    setSelectedBeneficiaryWallet('');
  };

  // to show and hide block
  const onSelectBlock = value => {
    if (beneficiaries === undefined) {
      Alert.alert('Please Select Beneficiary first!');
    } else {
      if (value === CASH_PICKUP) {
        setSelectedBeneficiaryBank('');
        setSelectedBeneficiaryWallet('');
      } else if (value === BANK_DEPOSIT) {
        setSelecetedPayer('');
        setSelectedBeneficiaryWallet('');
      }
      layoutAnimation();
      setSelectedBlock(value);
    }
  };

  const onAddBeneficiaryBank = addedBank => {
    _getBeneficiaries();
    const updateSelectedBeneficiary = {
      ...selectedBeneficiary,
      banks: [...selectedBeneficiary.banks, addedBank],
    };
    setSelectedBeneficiary(updateSelectedBeneficiary);
  };

  const onAddBeneficiaryWallet = addedWallet => {
    _getBeneficiaries();
    const updateSelectedBeneficiary = {
      ...selectedBeneficiary,
      wallets: [...selectedBeneficiary.wallets, addedWallet],
    };
    setSelectedBeneficiary(updateSelectedBeneficiary);
  };

  const onChangeBeneficiaryBank = value => {
    const selectedValue = selectedBeneficiary.banks.find(
      item => item.bankName === value,
    );
    setSelectedBeneficiaryBank(selectedValue);
  };

  const onChangeBeneficiaryWallet = value => {
    const selectedValue = selectedBeneficiary.wallets.find(
      item => item.identificationValue === value,
    );
    setSelectedBeneficiaryWallet(selectedValue);
  };

  const renderBlock = blockType => {
    var block = null;
    switch (blockType) {
      case CASH_PICKUP:
        block = (
          <CashPickupBlock
            data={payersList}
            pickerValue={'name'}
            onValueChange={onChangePayers}
            value={selecetedPayer}
            default={!review}
          />
        );
        break;
      case BANK_DEPOSIT:
        block = (
          <BankDepositBlock
            pickerValue={'bankName'}
            // baneficiary bacnk picker
            pickOptions={selectedBeneficiary.banks}
            onValueChange={onChangeBeneficiaryBank}
            value={selectedBeneficiaryBank}
            default={!review}
            beneficiaryId={selectedBeneficiary.referenceId}
            banksList={banksList}
            onPressAddBank={value => setAddBank(value)}
            onSuccessAddBeneficiaryBank={res => onAddBeneficiaryBank(res)}
          />
        );
        break;
      case HOME_DELIVERY:
        block = (
          <HomeDeliveryBlock
            item={selectedBeneficiary}
            onSelectHomeDelivery={res => setSelecetedPayer(res)}
          />
        );
        break;
      case WALLET:
        block = (
          <WalletBlock
            selectedBeneficiary={selectedBeneficiary}
            pickerValue={'identificationValue'}
            pickOptions={selectedBeneficiary.wallets}
            beneficiaryId={selectedBeneficiary.referenceId}
            onValueChange={onChangeBeneficiaryWallet}
            value={selectedBeneficiaryWallet}
            default={!review}
            onPressAdd={value => setAddBank(value)}
            onSuccessAddBeneficiaryWallet={res => onAddBeneficiaryWallet(res)}
          />
        );
        break;
      default:
        break;
    }

    return block;
  };

  const renderReceiveMethod = ({item}) => {
    return selectedBlock === undefined ? (
      checkAvailablePayoutMethod(
        transactionDetails.destination.payoutMethod,
        item.value,
      ) ? (
        <ExpandableBlock
          onPress={() => {
            if (selectedBeneficiary !== undefined) {
              onSelectBlock(item.payoutMethod);
            } else {
              Alert.alert('Please, selected beneficiary first');
            }
          }}
          containerStyle={styles.blockContainer}
          leftContent={item.icon}
          title={item.title}
          caption={item.caption}
          rightContent={<Outline />}
        />
      ) : null
    ) : item.payoutMethod === selectedBlock ? (
      <ExpandableBlock
        onPress={() => onSelectBlock(undefined)}
        containerStyle={styles.blockContainer}
        leftContent={item.icon}
        title={item.title}
        caption={item.caption}
        rightContent={<Done size={30} />}
        // content={<BlockComponent blockType={item.payoutMethod}
        content={renderBlock(item.payoutMethod)}
      />
    ) : null;
  };

  const onPressContinue = () => {
    let recipientBankId = '';

    if (selectedBlock === WALLET) {
      recipientBankId = selectedBeneficiaryWallet.referenceId;
    } else if (selectedBlock === BANK_DEPOSIT) {
      recipientBankId =
        selectedBeneficiaryBank.referenceId !== undefined
          ? selectedBeneficiaryBank.referenceId
          : ''; // ID obtained from /v1/senders/beneficiaries/bank
    }

    const transactionDetail = {
      recipientId: selectedBeneficiary.referenceId, //ID of beneficiary
      recipientBankId: recipientBankId, // ID obtained from /v1/senders/beneficiaries/bank,
      payerId:
        selecetedPayer.referenceId !== undefined
          ? selecetedPayer.referenceId
          : '', //ID obtained from /v1/payers",
      payoutMethod: selectedBlock,
      beneficiary: selectedBeneficiary,
      payer: selecetedPayer,
      BeneficiaryBank: selectedBeneficiaryBank,
    };

    if (review) {
      dispatch(createTransactionData(transactionDetail));
      navigation.navigate(NAVIGATION_TO_TRANSACTION_DETAILS_SCREEN);
      return;
    }

    if (route?.params?.routeFrom === 'SendMoney') {
      dispatch(createTransactionData(transactionDetail));
      navigation.navigate(NAVIGATION_TO_PAYOUT_METHOD_SCREEN);
    } else {
      // check route
      navigation.navigate(NAVIGATION_TO_BENEFICIARY_SUCCESS_SCREEN);
    }
  };

  const btnDisabled = () => {
    let disabled = true;

    if (selectedBeneficiary === undefined) {
      disabled = true;
    } else {
      if (selectedBlock) {
        if (selectedBlock === HOME_DELIVERY) {
          const isHomeDeliveryEnabled =
            selectedBeneficiary.address.state === 'Yerevan';
          disabled = !isHomeDeliveryEnabled;
        } else if (selectedBlock === BANK_DEPOSIT && !selectedBeneficiaryBank) {
          disabled = true;
        } else if (selectedBlock === WALLET && !selectedBeneficiaryWallet) {
          disabled = true;
        } else {
          disabled = false;
        }
      }
    }
    return disabled;
  };

  const navigateToCreateBeneficiary = () => {
    navigation.navigate(NAVIGATION_TO_CREATE_BENEFICIARY_SCREEN, {
      routeFrom: 'AddBeneficiaryDetails',
    });
  };

  return (
    <GenericView
      padding
      loading={loading}
      header={<Header title="Add Beneficiary" />}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.kyeboardAwareViewContainer}>
        <FlatList
          ListHeaderComponent={
            <React.Fragment>
              <SemiBoldText
                text="Beneficiary details"
                style={[styles.headerText]}
              />
              <PickerModal
                onPressEmptyPicker={navigateToCreateBeneficiary}
                placeholder="Select Beneficiary"
                label={'Please Select Beneficiary'}
                pickOptions={
                  beneficiaries === undefined ? [] : beneficiaries.result
                }
                pickerValue={'fullName'}
                onValueChange={onChangeBeneficiary}
                value={selectedBeneficiary}
                default={false}
              />

              <View style={styles.createBeneficiaryStyle}>
                <MediumText text="or, " style={[styles.primaryText]} />
                <TouchableOpacity onPress={navigateToCreateBeneficiary}>
                  <MediumText
                    text="Create New Beneficiary"
                    style={[styles.redText]}
                  />
                </TouchableOpacity>
              </View>
              {!loading && selectedBeneficiary !== undefined && (
                <MediumText
                  text="Please Select Receive Method"
                  style={[styles.primaryText]}
                />
              )}
            </React.Fragment>
          }
          showsVerticalScrollIndicator={false}
          data={
            !loading && selectedBeneficiary !== undefined ? receiveMethod : []
          }
          renderItem={renderReceiveMethod}
          keyExtractor={item => item.title}
          ListFooterComponent={
            <FooterButton
              disabled={btnDisabled()}
              text="Continue"
              onPress={onPressContinue}
            />
          }
          contentContainerStyle={styles.contentContainerStyle}
          ListFooterComponentStyle={styles.listFooterComponentStyle}
        />
      </KeyboardAwareScrollView>
    </GenericView>
  );
}

const styles = StyleSheet.create({
  kyeboardAwareViewContainer: {flex: 1},
  headerText: {
    marginBottom: 15,
  },
  primaryText: {
    color: theme.primaryColor,
  },
  optionContainer: {
    marginTop: 30,
  },
  blockContainer: {
    marginVertical: 10,
  },
  createBeneficiaryStyle: {
    marginTop: 20,
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  redText: {color: theme.red},
  listFooterComponentStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  contentContainerStyle: {
    minHeight: '100%',
    paddingBottom: 70,
  },
});
