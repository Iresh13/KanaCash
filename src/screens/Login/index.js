import React, {useState, useRef} from 'react';
import {connect, useDispatch} from 'react-redux';
import {StyleSheet, View, Keyboard} from 'react-native';
import Button from '~/components/ui/Button';
import theme from '~/components/theme/Style';
import NTextInput from '~/components/ui/TextInput';
import {MediumText} from '~/components/ui/Text';
import AuthHeader from '~/components/ui/AuthHeader';
import GenericView from '~/components/ui/GenericView';
import {KeyboardAwareView} from '~/presentation';
import {loginApi} from '~/store/actions/LoginAction';
import {validate} from '~/utils';
import {
  checkEmptyState,
  checkUserInputs,
  checkErrorMessage,
} from '../../utils/validationHandler';
import {DeviceInfo} from '~/services';
import {
  NAVIGATION_TO_FORGOT_PASSWORD_SCREEN,
  NAVIGATION_TO_USER_INFORMATION_SCREEN,
} from '../../navigation/routes';

function checkEmpty(value) {
  return value !== '' ? true : false;
}

export default function LoginScreen({navigation}) {
  const passwordInput = useRef(null);

  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState({
    emailErrorMessage: '',
    passwordErrorMessage: '',
  });
  const [validator, setValidator] = useState({});

  // form validation
  React.useEffect(() => {
    setErrorMessage({});
    const {email, password} = state;
    const emailValidate = checkEmpty(email) && !validate.email(email);
    const passwordValidate = checkEmpty(password) && password.length < 1;
    setValidator(prevState => ({
      ...prevState,
      emailValidate,
      passwordValidate,
    }));
  }, [state]);

  const navigateToForgetPassword = () => {
    navigation.navigate(NAVIGATION_TO_FORGOT_PASSWORD_SCREEN);
  };

  const loginHandler = async () => {
    Keyboard.dismiss();
    const isValidate = checkUserInputs(state, validator);
    if (isValidate) {
      const deviceUniqueId = DeviceInfo.UniqueId;
      const body = {
        email: state.email,
        password: state.password,
        device: deviceUniqueId,
      };
      dispatch(loginApi(body));
    } else {
      const validateData = checkEmptyState(state);
      setValidator(prevState => ({
        ...prevState,
        ...validateData,
      }));
      const errMsg = checkErrorMessage({email: state.email});
      setErrorMessage(prevState => ({
        ...prevState,
        ...errMsg,
      }));
      if (state.password === '') {
        setErrorMessage(prevState => ({
          ...prevState,
          passwordErrorMessage: 'This field cannot be empty',
        }));
      }
    }
  };

  return (
    <GenericView scrollable padding keyboardView>
      <KeyboardAwareView>
        <AuthHeader title="Login" back />
        <View style={styles.formWrapper}>
          <NTextInput
            autoCompleteType="email"
            keyboardType="email-address"
            label="Email Address"
            inputParentStyles={styles.inputParentStyleMarginBottom}
            hasError={validator.emailValidate}
            onChangeText={email =>
              setState(prevState => ({
                ...prevState,
                email: email,
                emailError: false,
              }))
            }
            value={state.email}
            errorMessage={errorMessage.emailErrorMessage}
            returnKeyType={'next'}
            onSubmitEditing={() => passwordInput.current.focus()}
          />
          <NTextInput
            autoCompleteType="password"
            label="Password"
            hasError={validator.passwordValidate}
            inputParentStyles={styles.inputParentStyleMarginBottom}
            password={true}
            onChangeText={password =>
              setState(prevState => ({
                ...prevState,
                password: password,
                passwordError: false,
              }))
            }
            value={state.password}
            blurOnSubmit={true}
            errorMessage={errorMessage.passwordErrorMessage}
            returnKeyType={'go'}
            inputRef={passwordInput}
            onSubmitEditing={loginHandler}
          />
          <Button text="Login" onPress={loginHandler} style={styles.loginBtn} />
          <MediumText
            text="Forgot Password?"
            style={[styles.forgotPassword]}
            onPress={navigateToForgetPassword}
          />
          <Button
            buttonInvert
            text="Don't have an account? Sign Up"
            onPress={() =>
              navigation.navigate(NAVIGATION_TO_USER_INFORMATION_SCREEN)
            }
            style={styles.registerBtn}
          />
        </View>
      </KeyboardAwareView>
    </GenericView>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    overflow: 'scroll',
    backgroundColor: '#FFF',
  },

  formWrapper: {
    flex: 2,
    maxHeight: '100%',
    width: '100%',
  },

  loginBtn: {
    marginTop: 5,
    marginBottom: 8,
    fontSize: 18,
  },
  registerBtn: {
    marginTop: 30,
  },
  forgotPassword: {
    color: theme.red,
    textAlign: 'right',
    marginTop: 5,
    fontWeight: '600',
  },
  inputParentStyleMarginBottom: {
    marginBottom: 20,
  },
});
