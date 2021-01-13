import React, {useState} from 'react';
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
import {
  checkEmptyState,
  checkUserInputs,
  checkErrorMessage,
} from '~/utils/validationHandler';
import {validate} from '~/utils';
import {setError} from '~/store/actions/Error';

BankDepositBlock.defaultProps = {};

BankDepositBlock.propTypes = {
  onPressAdd: PropTypes.func.isRequired,
  onSuccessAddBeneficiaryWallet: PropTypes.func.isRequired,
};

function checkEmpty(value) {
  return value !== '' ? true : false;
}

export default function BankDepositBlock({
  onPressAdd,
  beneficiaryId,
  onSuccessAddBeneficiaryWallet,
  ...pickerProps
}) {
  const [addNew, setAddNewBank] = React.useState(false);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    identificationValue: '',
  });

  const [validator, setValidator] = React.useState({});
  const [errorMessage, setErrorMessage] = useState({});

  // validation
  React.useEffect(() => {
    setErrorMessage({});
    const {identificationValue} = state;
    const identificationValueValidate =
      checkEmpty(identificationValue) &&
      !validate.walletIdentificationValue(identificationValue);

    setValidator(prevState => ({
      ...prevState,
      identificationValueValidate,
    }));
  }, [state]);

  const setErrorMsg = () => {
    setErrorMessage(prevState => ({
      ...prevState,
      identificationValueErrorMessage: 'Not Found',
    }));
    setValidator(prevState => ({
      ...prevState,
      identificationValueValidate: true,
    }));
  };

  const onAddWallet = () => {
    const userInput = {
      identificationValue: state.identificationValue,
    };
    const isValidate = checkUserInputs(userInput, validator);

    if (isValidate) {
      dispatch(showLoader());
      const body = {
        identificationValue: state.identificationValue,
      };
      api
        .createBeneficiaryWallet(beneficiaryId, body)
        .then(res => {
          console.log('setIdentificationValue', res.data);
          if (res.status === 200) {
            dispatch(hideLoader());
            setState({});
            onSuccessAddBeneficiaryWallet(res.data);
            toggleAddBank();
            dispatch(
              setError({
                message: 'Beneficiary wallet has been successfully added',
              }),
            );
          } else {
            dispatch(hideLoader());
            setErrorMsg();
          }
        })
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          dispatch(hideLoader());
          setErrorMsg();
          const msg = JSON.parse(err.data.message);
          dispatch(setError({message: msg?.message}));
        });
    } else {
      const validateData = checkEmptyState(userInput);
      setValidator(prevState => ({
        ...prevState,
        ...validateData,
      }));
      const errMsg = checkErrorMessage({
        ...state,
      });
      setErrorMessage(prevState => ({
        ...prevState,
        ...errMsg,
      }));
      dispatch(hideLoader());
    }
  };

  const toggleAddBank = () => {
    setAddNewBank(!addNew);
    onPressAdd(!addNew);
  };

  return (
    <View style={styles.container}>
      <RegularText
        text={'Please provide the bank details of your beneficiary'}
        style={styles.headerText}
      />
      <PickerModal
        onPressEmptyPicker={toggleAddBank}
        label="Select a Wallet Identificaion"
        placeholder="Select"
        inputParentStyles={styles.inputParentStyle}
        {...pickerProps}
      />
      <AddNew text="add new wallet" onPress={toggleAddBank} />
      {addNew && (
        <View style={styles.formWrapper}>
          <NTextInput
            label="Identification Number"
            inputParentStyles={styles.inputParentStyle}
            value={state.identificationValue}
            keyboardType="numeric"
            hasError={validator.identificationValueValidate}
            errorMessage={errorMessage.identificationValueErrorMessage}
            onChangeText={value => {
              value = value.slice(0, 9);
              setState(prevState => ({
                ...prevState,
                identificationValue: value,
              }));
            }}
          />
          <Button
            text="Add Wallet"
            style={styles.btnStyle}
            buttonWidth={345}
            onPress={onAddWallet}
          />
        </View>
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
  formWrapper: {
    marginTop: 15,
  },
});
