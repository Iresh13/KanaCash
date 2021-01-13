import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import {useDispatch} from 'react-redux';
import NTextInput from '~/components/ui/TextInput';
import {SemiBoldText} from '~/components/ui/Text';
import PickerModal from '~/components/ui/PickerModal';
import GenericView from '~/components/ui/GenericView';
import {KeyboardAwareView} from '~/presentation';
import {NAVIGATION_TO_CALCULATOR_SCREEN} from '../../navigation/routes';
import {DeviceInfo} from '~/services';
import {validate} from '~/utils';
import {signupApi} from '~/store/actions/SignupAction';
import {HomeIcon} from '~/components/ui/Icon';
import FooterButton from '~/components/ui/FooterButton';
import {
  checkEmptyState,
  checkUserInputs,
  checkErrorMessage,
} from '~/utils/validationHandler';
import * as api from '~/services/axios/Api';

function checkEmpty(value) {
  return value !== '' ? true : false;
}

export default function UserInformation({navigation}) {
  const mNameInput = useRef(null);
  const lNameInput = useRef(null);
  const emailInput = useRef(null);
  const phoneInput = useRef(null);
  const passwordInput = useRef(null);
  const cPasswordInput = useRef(null);

  const dispatch = useDispatch();
  const [userInformation, setUserInformation] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    state: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    email: '',
  });
  const [state, setState] = useState([]);
  const [validator, setValidator] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  React.useEffect(() => {
    api
      .getState('USA')
      .then(res => {
        setState(res.data.result);
      })
      // eslint-disable-next-line handle-callback-err
      .catch(err => {});
  }, []);

  // form validation
  React.useEffect(() => {
    const {
      firstName,
      middleName,
      lastName,
      // eslint-disable-next-line no-shadow
      state,
      password,
      confirmPassword,
      phoneNumber,
      email,
    } = userInformation;
    setErrorMessage({});
    const firstNameValidate =
      checkEmpty(firstName) && !validate.text(firstName);
    const middleNameValidate =
      checkEmpty(middleName) && !validate.text(middleName);
    const lastNameValidate = checkEmpty(lastName) && !validate.text(lastName);
    const phoneNumberValidate =
      checkEmpty(phoneNumber) && !validate.phoneNumber(phoneNumber);
    const emailValidate = checkEmpty(email) && !validate.email(email);
    const stateValidate = checkEmpty(state) && state.length < 2;

    var passwordValidate;

    if (!checkEmpty(password)) {
      passwordValidate = false;
      setErrorMessage(prevState => ({
        ...prevState,
        passwordErrorMessage: false,
      }));
    } else {
      passwordValidate = !validate.password(password);
      const errMsg = checkErrorMessage({password});
      setErrorMessage(prevState => ({
        ...prevState,
        ...errMsg,
      }));
    }

    var confirmPasswordValidate;
    if (confirmPassword.length > 0) {
      confirmPasswordValidate = password === confirmPassword ? false : true;
    }

    setValidator(prevState => ({
      ...prevState,
      firstNameValidate,
      middleNameValidate,
      lastNameValidate,
      phoneNumberValidate,
      emailValidate,
      passwordValidate,
      confirmPasswordValidate,
      stateValidate,
    }));
  }, [userInformation]);

  const onPressContinue = () => {
    Keyboard.dismiss();
    const userInput = {
      firstName: userInformation.firstName,
      lastName: userInformation.lastName,
      state: userInformation.state,
      password: userInformation.password,
      confirmPassword: userInformation.confirmPassword,
      phoneNumber: userInformation.phoneNumber,
      email: userInformation.email,
    };
    const isValidate = checkUserInputs(userInput, validator);
    if (isValidate) {
      const deviceUniqueId = DeviceInfo.UniqueId;
      const body = {
        firstName: userInformation.firstName.trim(),
        middleName: userInformation.middleName.trim(),
        lastName: userInformation.lastName.trim(),
        email: userInformation.email.trim(),
        phoneNumber: userInformation.phoneNumber.trim(),
        password: userInformation.password.trim(),
        state: userInformation.state.trim(),
        device: deviceUniqueId,
        countryCode: '+1',
      };
      console.log('body', body);
      dispatch(signupApi(body));
    } else {
      const validateData = checkEmptyState({
        ...userInput,
      });
      setValidator(prevState => ({
        ...prevState,
        ...validateData,
      }));
      const errMsg = checkErrorMessage(userInformation);
      setErrorMessage(prevState => ({
        ...prevState,
        ...errMsg,
      }));
    }
  };

  const onSelectState = stateValue => {
    const selectedState = state.find(item => item.name === stateValue);
    setUserInformation(prevState => ({
      ...prevState,
      state: selectedState.code,
    }));
  };

  return (
    <GenericView keyboardView padding scrollable>
      <KeyboardAwareView>
        <View style={styles.topView}>
          <TouchableOpacity
            onPress={() =>
              navigation.push(NAVIGATION_TO_CALCULATOR_SCREEN, {back: true})
            }>
            <HomeIcon />
          </TouchableOpacity>
        </View>

        <SemiBoldText
          text="Enter your personal details"
          style={[styles.headerText]}
        />
        <>
          <NTextInput
            errorMessage={errorMessage.firstNameErrorMessage}
            hasError={validator.firstNameValidate}
            label="First Name"
            inputParentStyles={styles.inputParentStyleMarginBottom}
            onChangeText={firstName =>
              setUserInformation(prevState => ({
                ...prevState,
                firstName: firstName,
              }))
            }
            value={userInformation.firstName}
            onSubmitEditing={() => mNameInput.current.focus()}
          />
          <NTextInput
            label="Middle Name (Optional)"
            errorMessage={errorMessage.middleNameErrorMessage}
            hasError={validator.middleNameValidate}
            inputParentStyles={styles.inputParentStyleMarginBottom}
            onChangeText={middleName =>
              setUserInformation(prevState => ({
                ...prevState,
                middleName: middleName,
              }))
            }
            value={userInformation.middleName}
            inputRef={mNameInput}
            onSubmitEditing={() => lNameInput.current.focus()}
          />
          <NTextInput
            errorMessage={errorMessage.lastNameErrorMessage}
            label="Last Name"
            hasError={validator.lastNameValidate}
            inputParentStyles={styles.inputParentStyleMarginBottom}
            onChangeText={lastName =>
              setUserInformation(prevState => ({
                ...prevState,
                lastName: lastName,
              }))
            }
            value={userInformation.lastName}
            inputRef={lNameInput}
            onSubmitEditing={() => emailInput.current.focus()}
          />
          <NTextInput
            errorMessage={errorMessage.emailErrorMessage}
            label="Email address"
            keyboardType="email-address"
            hasError={validator.emailValidate}
            inputParentStyles={styles.inputParentStyleMarginBottom}
            onChangeText={email =>
              setUserInformation(prevState => ({
                ...prevState,
                email: email,
              }))
            }
            value={userInformation.email}
            inputRef={emailInput}
            onSubmitEditing={() => phoneInput.current.focus()}
          />
          <NTextInput
            errorMessage={errorMessage.phoneNumberErrorMessage}
            label={'Phone Number'}
            leftIcon={
              <Image source={require('../../assets/image/UsaCode.png')} />
            }
            hasError={validator.phoneNumberValidate}
            inputParentStyles={styles.inputParentStyleMarginBottom}
            onChangeText={phoneNumber => {
              phoneNumber = phoneNumber.slice(0, 10);
              setUserInformation(prevState => ({
                ...prevState,
                phoneNumber: phoneNumber,
              }));
            }}
            value={userInformation.phoneNumber}
            keyboardType="phone-pad"
            returnKeyType="go"
            blurOnSubmit={true}
            inputRef={phoneInput}
            onSubmitEditing={() => passwordInput.current.focus()}
          />
          <PickerModal
            default={false}
            hasError={validator.stateValidate}
            errorMessage={'This field cannot be empty'}
            label="State"
            onValueChange={onSelectState}
            pickerValue={'name'}
            pickOptions={state.sort((a, b) => a.name.localeCompare(b.name))}
            placeholder="Select"
            inputParentStyles={styles.inputParentStyleMarginBottom}
          />
          <NTextInput
            errorMessage={errorMessage.passwordErrorMessage}
            hasError={validator.passwordValidate}
            label="Password"
            inputParentStyles={styles.inputParentStyleMarginBottom}
            onChangeText={password =>
              setUserInformation(prevState => ({
                ...prevState,
                password: password,
              }))
            }
            value={userInformation.password}
            secureTextEntry
            inputRef={passwordInput}
            onSubmitEditing={() => cPasswordInput.current.focus()}
          />
          <NTextInput
            errorMessage={errorMessage.confirmPasswordErrorMessage}
            hasError={validator.confirmPasswordValidate}
            label="Confirm Password"
            inputParentStyles={styles.inputParentStyleMarginBottom}
            onChangeText={confirmPassword =>
              setUserInformation(prevState => ({
                ...prevState,
                confirmPassword: confirmPassword,
              }))
            }
            value={userInformation.confirmPassword}
            secureTextEntry
            inputRef={cPasswordInput}
            returnKeyType={'go'}
            onSubmitEditing={onPressContinue}
          />
          <FooterButton
            text="Continue"
            onPress={onPressContinue}
            style={styles.continueBtn}
          />
        </>
      </KeyboardAwareView>
    </GenericView>
  );
}

const styles = StyleSheet.create({
  topView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    marginVertical: 15,
  },
  continueBtn: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 18,
  },
  inputParentStyleMarginBottom: {
    marginBottom: 20,
  },
});
