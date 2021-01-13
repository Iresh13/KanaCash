import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import theme from '~/components/theme/Style';
import Button from '~/components/ui/Button';
import NTextInput from '~/components/ui/TextInput';
import AuthHeader from '~/components/ui/AuthHeader';
import {useDispatch} from 'react-redux';
import GenericView from '~/components/ui/GenericView';
import {MediumText} from '~/components/ui/Text';
import {
  checkEmptyState,
  checkUserInputs,
  checkErrorMessage,
} from '../../utils/validationHandler';
import {validate} from '~/utils';
import {forgotPasswordApi} from '~/store/actions/ForgotPassword';

function checkEmpty(value) {
  return value !== '' ? true : false;
}

const ForgotPasswordScreen = props => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: '',
  });
  const [errorMessage, setErrorMessage] = useState({
    emailErrorMessage: '',
  });
  const [validator, setValidator] = useState({});

  React.useEffect(() => {
    setErrorMessage({});
    const {email} = state;
    const emailValidate = checkEmpty(email) && !validate.email(email);
    setValidator(prevState => ({
      ...prevState,
      emailValidate,
    }));
  }, [state]);

  const forgotPasswordHandler = async () => {
    const isValidate = checkUserInputs(state, validator);
    if (isValidate) {
      dispatch(forgotPasswordApi(state.email));
    } else {
      const validateData = checkEmptyState(state);
      setValidator(prevState => ({
        ...prevState,
        ...validateData,
      }));
      const errMsg = checkErrorMessage(state);
      setErrorMessage(prevState => ({
        ...prevState,
        ...errMsg,
      }));
    }
  };

  return (
    <GenericView padding scrollable>
      <AuthHeader back title="Forgot Password" />
      <View style={styles.formWrapper}>
        <NTextInput
          label="Email Address"
          inputParentStyles={styles.inputParentStyleMarginBottom}
          onChangeText={value =>
            setState(prevState => ({...prevState, email: value}))
          }
          value={state.email}
          returnKeyType="go"
          blurOnSubmit={true}
          keyboardType="email-address"
          hasError={validator.emailValidate}
          errorMessage={errorMessage.emailErrorMessage}
        />
        <Button
          text="Continue"
          onPress={forgotPasswordHandler}
          style={styles.loginBtn}
        />
        <MediumText
          text="Back to login"
          style={[styles.backText]}
          onPress={() => props.navigation.goBack()}
        />
      </View>
    </GenericView>
  );
};

const styles = StyleSheet.create({
  formWrapper: {
    flex: 2,
    maxHeight: '100%',
    width: '100%',
    alignItems: 'center',
  },
  loginBtn: {
    marginTop: 5,
    marginBottom: 8,
    fontSize: 18,
  },
  inputParentStyleMarginBottom: {
    marginBottom: 20,
  },
  backText: {
    color: theme.red,
    textAlign: 'right',
    marginTop: 10,
    fontWeight: '600',
  },
});

export default ForgotPasswordScreen;
