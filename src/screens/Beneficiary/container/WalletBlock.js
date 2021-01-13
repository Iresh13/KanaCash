import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {View, StyleSheet, Alert} from 'react-native';
import NTextInput from '~/components/ui/TextInput';
import theme from '~/components/theme/Style';
import * as api from '~/services/axios/Api';
import {
  checkEmptyState,
  checkUserInputs,
  checkErrorMessage,
} from '~/utils/validationHandler';
import {validate} from '~/utils';
import FooterButton from '~/components/ui/FooterButton';

WalletBlock.defaultProps = {};

WalletBlock.propTypes = {
  onPressContinue: PropTypes.func.isRequired,
};

function checkEmpty(value) {
  return value !== '' ? true : false;
}

export default function WalletBlock({
  beneficiaryId,
  onPressContinue,
  onPressBack,
}) {
  const [state, setState] = useState({
    identificationValue: '',
  });

  const [validator, setValidator] = React.useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [creating, setCreating] = React.useState(false);

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

  const setError = () => {
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
      const body = {
        identificationValue: state.identificationValue,
      };
      setCreating(true);
      api
        .createBeneficiaryWallet(beneficiaryId, body)
        .then(res => {
          setCreating(false);
          if (res.status === 200) {
            setState({});
            onPressContinue(res.data);
            setTimeout(() => {
              Alert.alert('Successfully add Wallet');
            }, 1000);
          } else {
            setError();
          }
        })
        .catch(err => {
          console.log('let me print err message', err);
          setCreating(false);
          setError();
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
    }
  };

  return (
    <View style={styles.container}>
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
      <FooterButton
        disabled={creating}
        onPressBack={onPressBack}
        text="Continue"
        onPress={onAddWallet}
        style={styles.continueBtn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
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
