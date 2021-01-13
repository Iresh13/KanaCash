import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import PickerModal from '~/components/ui/PickerModal';
import {RegularText} from '~/components/ui/Text';
import NTextInput from '~/components/ui/TextInput';
import * as api from '~/services/axios/Api';
import Button from './Button';
import {checkEmptyState, checkUserInputs} from '~/utils/validationHandler';

function checkEmpty(value) {
  return value !== '' ? true : false;
}

export default function AddNewBank({
  beneficiaryId,
  onSuccessAddBeneficiaryBank,
  onPressBack,
  countryCode,
}) {
  const [banksList, setBanksList] = React.useState([]);
  const [state, setState] = React.useState({
    accountNumber: '',
    branchLocation: '',
  });
  const [selectedBank, setSelectedBank] = React.useState(undefined);
  const [creating, setCreating] = React.useState(false);
  const [validator, setValidator] = React.useState({});

  // form validation
  React.useEffect(() => {
    const {accountNumber, branchLocation} = state;
    const accountNumberValidate =
      checkEmpty(accountNumber) && accountNumber.length < 3;
    const branchLocationValidate =
      checkEmpty(branchLocation) && branchLocation.length < 3;

    setValidator(prevState => ({
      ...prevState,
      accountNumberValidate,
      branchLocationValidate,
    }));
  }, [state]);

  React.useEffect(() => {
    const getBanksByCountry = api
      .getBanksByCountry(countryCode)
      .then(res => setBanksList(res.data.result));
  }, []);

  const onChangeBank = value => {
    const selectedBank = banksList.find(item => item.name === value);
    setSelectedBank(selectedBank);
  };

  const onAddBaneficiaryBank = ({}) => {
    const userInput = {
      accountNumber: state.accountNumber,
    };
    const isValidate = checkUserInputs(userInput, validator);
    setCreating(true);
    if (isValidate) {
      const body = {
        beneficiaryId: beneficiaryId,
        bankId: selectedBank.referenceId,
        branchLocation: state.branchLocation,
        accountNumber: state.accountNumber,
        accountType: 'CHECKING',
      };
      api
        .createBeneficiaryBank(body)
        .then(res => {
          if (res.status === 200) {
            setState(prevState => ({
              ...prevState,
              accountNumber: '',
              branchLocation: '',
            }));
            setCreating(false);
            onSuccessAddBeneficiaryBank();
            setTimeout(() => {
              Alert.alert('Successfully add Bank');
            }, 1000);
          } else {
            setCreating(false);
          }
        })
        .catch(() => {
          setCreating(false);
        });
    } else {
      const validateData = checkEmptyState(userInput);
      setValidator(prevState => ({
        ...prevState,
        ...validateData,
      }));
      setCreating(false);
    }
  };

  return (
    <View>
      <RegularText text="Add New Bank" style={{marginVertical: 15}} />
      <PickerModal
        label="Select the Bank ..."
        pickOptions={banksList}
        placeholder="Select"
        inputParentStyles={styles.inputParentStyle}
        onValueChange={onChangeBank}
        pickerValue={'name'}
      />
      {/* <NTextInput
        label="Branch Location"
        inputParentStyles={styles.inputParentStyle}
        onChangeText={value =>
          setState(prevState => ({...prevState, branchLocation: value}))
        }
        value={state.branchLocation}
        hasError={validator.branchLocationValidate}
      /> */}
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

      <Button
        onPressBack={onPressBack}
        disabled={creating}
        text="Add Bank"
        style={styles.btnStyle}
        buttonWidth={345}
        onPress={onAddBaneficiaryBank}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputParentStyle: {
    marginBottom: 15,
  },
  headerText: {
    color: 'blue',
    fontWeight: '500',
    marginBottom: 20,
  },
  btnStyle: {},
});
