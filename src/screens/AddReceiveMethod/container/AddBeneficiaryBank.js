import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {RegularText} from '~/components/ui/Text';
import NTextInput from '~/components/ui/TextInput';
import theme from '~/components/theme/Style';
import PickerModal from '~/components/ui/PickerModal';
import * as api from '~/services/axios/Api';
import {showLoader, hideLoader} from '~/store/actions/LoaderAction';
import {
  checkEmptyState,
  checkUserInputs,
  // checkErrorMessage,
} from '~/utils/validationHandler';
import FooterButton from '~/components/ui/FooterButton';

BankDepositBlock.defaultProps = {};

BankDepositBlock.propTypes = {
  onPressContinue: PropTypes.func.isRequired,
};

function checkEmpty(value) {
  return value !== '' ? true : false;
}

export default function BankDepositBlock({
  beneficiaryId,
  onPressContinue,
  onPressBack,
  countryCode,
}) {
  const dispatch = useDispatch();
  const transactionDetails = useSelector(state => state.transaction);
  const [banksList, setBanksList] = useState([]);
  const [selectedBank, setSelectedBank] = React.useState(undefined);
  const [state, setState] = React.useState({
    accountNumber: '',
    branchLocation: '',
  });
  const [validator, setValidator] = React.useState({});

  React.useEffect(() => {
    console.log('res', transactionDetails.destinationCountry);
    const unsubscribe = api
      .getBanksByCountry(
        countryCode ? countryCode : transactionDetails.destinationCountry,
      )
      .then(res => {
        setBanksList(res.data.result);
      });
    return () => unsubscribe;
  }, [countryCode, transactionDetails.destinationCountry]);

  React.useEffect(() => {
    const accountNumberValidate =
      checkEmpty(state.accountNumber) && state.accountNumber.length < 3;
    const branchLocationValidate =
      checkEmpty(state.branchLocation) && state.branchLocation.length < 3;

    setValidator(prevState => ({
      ...prevState,
      accountNumberValidate,
      branchLocationValidate,
    }));
  }, [state.accountNumber, state.branchLocation]);

  const onAddBaneficiaryBank = () => {
    const userInput = {
      accountNumber: state.accountNumber,
    };
    const isValidate = checkUserInputs(userInput, validator);
    if (isValidate) {
      const body = {
        beneficiaryId: beneficiaryId,
        bankId: selectedBank.referenceId,
        branchLocation: state.branchLocation,
        accountNumber: state.accountNumber,
        accountType: 'CHECKING',
      };
      dispatch(showLoader());
      api
        .createBeneficiaryBank(body)
        .then(res => {
          if (res.status === 200) {
            setState(prevState => ({
              ...prevState,
              accountNumber: '',
              branchLocation: '',
            }));
            onPressContinue(res.data);
            dispatch(hideLoader());
          } else {
            dispatch(hideLoader());
          }
        })
        .catch(err => {
          dispatch(hideLoader);
        });
    } else {
      const validateData = checkEmptyState(userInput);
      setValidator(prevState => ({
        ...prevState,
        ...validateData,
      }));
      dispatch(hideLoader());
    }
  };

  const onChangeBank = value => {
    const filterSelectedBank = banksList.find(item => item.name === value);
    setSelectedBank(filterSelectedBank);
  };

  return (
    <View style={styles.container}>
      <RegularText text="" style={{marginTop: 3}} />
      <PickerModal
        label="Add Beneficiary Bank"
        pickOptions={banksList}
        placeholder="Select"
        inputParentStyles={styles.inputParentStyle}
        onValueChange={onChangeBank}
        pickerValue={'name'}
      />
      <NTextInput
        label="Account Number"
        inputParentStyles={styles.inputParentStyle}
        value={state.accountNumber}
        onChangeText={value =>
          setState(prevState => ({...prevState, accountNumber: value}))
        }
        keyboardType="numeric"
        hasError={validator.accountNumberValidate}
      />
      <FooterButton
        onPressBack={onPressBack}
        text="Continue"
        onPress={onAddBaneficiaryBank}
        style={styles.continueBtn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputParentStyle: {
    marginBottom: 15,
  },
  headerText: {
    color: theme.primaryColor,
    fontWeight: '500',
    marginBottom: 20,
  },
  btnStyle: {},
  continueBtn: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 18,
  },
});
