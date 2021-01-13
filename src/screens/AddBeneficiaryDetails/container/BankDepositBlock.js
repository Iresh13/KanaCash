import React from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {RegularText} from '~/components/ui/Text';
import NTextInput from '~/components/ui/TextInput';
import theme from '~/components/theme/Style';
import PickerModal from '~/components/ui/PickerModal';
import AddNew from './AddNew';
import Button from '~/components/ui/Button';
import * as api from '~/services/axios/Api';
import {showLoader, hideLoader} from '~/store/actions/LoaderAction';
import {checkEmptyState, checkUserInputs} from '~/utils/validationHandler';
import {setError} from '~/store/actions/Error';

BankDepositBlock.defaultProps = {
  banksList: [],
};

BankDepositBlock.propTypes = {
  onPressAddBank: PropTypes.func.isRequired,
  banksList: PropTypes.array.isRequired,
  onSuccessAddBeneficiaryBank: PropTypes.func.isRequired,
};

function checkEmpty(value) {
  return value !== '' ? true : false;
}

export default function BankDepositBlock({
  onPressAddBank,
  banksList,
  beneficiaryId,
  onSuccessAddBeneficiaryBank,
  ...pickerProps
}) {
  const dispatch = useDispatch();
  const [addNewBank, setAddNewBank] = React.useState(false);
  const [selectedBank, setSelectedBank] = React.useState(undefined);
  // form
  const [state, setState] = React.useState({
    accountNumber: '',
    branchLocation: '',
  });
  // validation
  const [validator, setValidator] = React.useState({});

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
            onSuccessAddBeneficiaryBank({
              ...res.data,
              bankName: selectedBank.name,
            });
            dispatch(hideLoader());
            dispatch(
              setError({
                message: 'Beneficiary bank has been successfully added',
              }),
            );
          } else {
            dispatch(hideLoader());
          }
          toggleAddBank();
        })
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          toggleAddBank();
          dispatch(hideLoader);
          const msg = JSON.parse(err.data.message);
          dispatch(setError({message: msg?.message}));
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
    const selectedBank = banksList.find(item => item.name === value);
    setSelectedBank(selectedBank);
  };

  const toggleAddBank = () => {
    setAddNewBank(!addNewBank);
    onPressAddBank(!addNewBank);
  };

  return (
    <View style={styles.container}>
      <RegularText
        text={'Please provide the bank details of your beneficiary'}
        style={styles.headerText}
      />
      <PickerModal
        onPressEmptyPicker={toggleAddBank}
        label="Select a bank beneficiary"
        placeholder="Select"
        inputParentStyles={styles.inputParentStyle}
        {...pickerProps}
      />
      <AddNew text="add new bank" onPress={toggleAddBank} />
      {addNewBank && (
        <React.Fragment>
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
            text="Add Bank"
            style={styles.btnStyle}
            buttonWidth={345}
            onPress={onAddBaneficiaryBank}
          />
        </React.Fragment>
      )}
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
});
