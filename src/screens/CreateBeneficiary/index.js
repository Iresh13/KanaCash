import React, {useState, useRef} from 'react';
import {StyleSheet, View, Alert, FlatList, Keyboard} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import GenericView from '~/components/ui/GenericView';
import Header from '~/components/ui/Header';
import FooterButton from '~/components/ui/FooterButton';
import NTextInput from '~/components/ui/TextInput';
import {SemiBoldText, RegularText} from '~/components/ui/Text';
import {KeyboardAwareView} from '~/presentation';
import * as api from '~/services/axios/Api';
import {setError} from '~/store/actions/Error';
import ExpandableBlock from '~/components/ui/ExpandableBlock';
import checkAvailablePayoutMethod from '~/utils/checkAvailablePayoutMethod';

import {
  // NAVIGATION_TO_ADD_BENEFICIARY_DETAILS_SCREEN,
  NAVIGATION_TO_ADD_RECEIVE_METHOD_SCREEN,
  NAVIGATION_TO_BENEFICIARY_SUCCESS_SCREEN,
} from '../../navigation/routes';
import {validate} from '~/utils';
import {
  checkEmptyState,
  checkUserInputs,
  checkErrorMessage,
} from '~/utils/validationHandler';
import PickerModal from '~/components/ui/PickerModal';
import receiveMethod, {
  CASH_PICKUP,
  // BANK_DEPOSIT,
  HOME_DELIVERY,
  // WALLET,
  walletConfig,
} from '~/constants/receiveMethod';
import {Outline, Done} from '~/components/ui/Icon';
import {counties, cities, getPostalCodeByCity} from './beneficiary.address';
function checkEmpty(value) {
  return value !== '' ? true : false;
}

const beneficiaryObj = {
  firstName: '',
  middleName: '',
  lastName: '',
  // country: 'ARM',
  country: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  // postalCode: '',
  state: '',
  phoneNumber: '',
};

export default function AddCard({navigation, route}) {
  const mNameInput = useRef(null);
  const lNameInput = useRef(null);
  // const addressInput = useRef(null);
  const cityInput = useRef(null);
  const postalInput = useRef(null);
  const phoneInput = useRef(null);

  const dispatch = useDispatch();

  const isUpdate = route.params?.update ? true : false;
  const isCountrySelected = route.params?.routeFrom ? true : false;
  const [receiverMethodSelected, setReceiverMethodSelected] = useState(
    isUpdate,
  );
  const transactionDetails = useSelector(state => state.transaction);

  const [pickerCountries, setPickerCountries] = useState([]);
  const [payoutMethod, setPayoutMethod] = useState(undefined);

  const [loading, setLoading] = useState(false);
  const [beneficiary, setBeneficiary] = useState(beneficiaryObj);
  const [state, setState] = useState([]);
  const [countries, setCountries] = useState([]);
  const [validator, setValidator] = useState({});
  const [errorMessage, setErrorMessage] = useState({});
  const [selectedBlock, setSelectedBlock] = useState(undefined);
  const [selectedCountry, setSelectedCountry] = useState({});
  const isHomeDeliverySelected = selectedBlock === HOME_DELIVERY;

  // validation
  React.useEffect(() => {
    const {
      firstName,
      middleName,
      lastName,
      country,
      // addressLine1,
      // eslint-disable-next-line no-unused-vars
      addressLine2,
      city,
      // postalCode,
      // eslint-disable-next-line no-shadow
      state,
      phoneNumber,
    } = beneficiary;
    setErrorMessage({});
    const firstNameValidate =
      checkEmpty(firstName) && !validate.text(firstName);
    const middleNameValidate =
      checkEmpty(middleName) && !validate.text(middleName);
    const lastNameValidate = checkEmpty(lastName) && !validate.text(lastName);
    const countryValidate = checkEmpty(country) && !validate.text(country);
    // const addressLine1Validate =
    //   checkEmpty(addressLine1) && addressLine1?.length < 3;
    const cityValidate = checkEmpty(city) && !validate.text(city);
    // const postalCodeValidate =
    //   checkEmpty(postalCode) && !validate.postalCode(postalCode);
    const stateValidate = checkEmpty(state) && state?.length < 2;
    const beneficiaryPhoneNumberValidate =
      checkEmpty(phoneNumber) && !validate.beneficiaryPhoneNumber(phoneNumber);

    setValidator(prevState => ({
      ...prevState,
      firstNameValidate,
      middleNameValidate,
      lastNameValidate,
      countryValidate,
      // addressLine1Validate,
      cityValidate,
      // postalCodeValidate,
      stateValidate,
      beneficiaryPhoneNumberValidate,
    }));
  }, [beneficiary]);

  const selectCountryForBeneficiary = countryValue => {
    const filterCountry = countries.find(item => item.name === countryValue);
    setPickerCountries([filterCountry]);
    setPayoutMethod(filterCountry);
  };

  React.useEffect(() => {
    if (isCountrySelected) {
      setPickerCountries([{...transactionDetails.destination}]);
      setPayoutMethod(transactionDetails.destination);
    }
  }, [isCountrySelected, transactionDetails.destination]);

  React.useEffect(() => {
    setLoading(true);
    const getDestinationCountries = api.getDestinationCountries('US');
    const unsubscribe = Promise.all([getDestinationCountries])
      .then(values => {
        setCountries(values[0].data.result);
        setLoading(false);
      })
      .then(error => setLoading(false));
    return () => unsubscribe;
  }, []);

  // if update
  React.useEffect(() => {
    if (isUpdate) {
      const {
        address: {addressLine1, addressLine2, city, country, postalCode, state},
        firstName,
        lastName,
        middleName,
        phoneNumber,
      } = route.params.update;
      setBeneficiary({
        addressLine1,
        addressLine2,
        city,
        country,
        postalCode,
        state,
        firstName,
        lastName,
        middleName,
        phoneNumber: phoneNumber,
      });
    }
  }, [isUpdate, route.params.update]);

  React.useEffect(() => {
    if (isHomeDeliverySelected) {
      setBeneficiary(prevState => ({
        ...prevState,
        city: 'Yerevan',
      }));
      if (state.length > 0) {
        const selectedState = state.find(item => item.name === 'Yerevan');
        setBeneficiary(prevState => ({
          ...prevState,
          state: selectedState.code,
        }));
      }
    }
  }, [isHomeDeliverySelected, state]);

  const updateBeneficiary = body => {
    api
      .updateBeneficiary(body, route.params.update.referenceId)
      .then(res => {
        console.log('res', res);
        setLoading(false);
        if (res.status === 200) {
          navigation.goBack();
          let modalConfig = {
            message: 'Beneficiary successfully updated',
            message_title: '',
          };
          dispatch(setError(modalConfig));
        } else {
          const msg = JSON.parse(res.data.message);
          let modalConfig = {
            message: msg?.message,
            message_title: '',
          };
          dispatch(setError(modalConfig));
        }
      })
      .catch(err => {
        setLoading(false);
        let message = 'Error while updating receiver';
        try {
          message = err?.data?.message
            ? JSON.parse(err.data.message)?.message
            : 'Error while updating receiver';
        } catch (error) {
          message = err.data.message;
        }
        Alert.alert(message);
      });
  };

  const createBeneficiary = body => {
    console.log('createBeneficiary', JSON.stringify(body));
    api
      .createBeneficiary(body)
      .then(res => {
        setLoading(false);
        if (res.status === 200) {
          console.log('res', res);
          if (route?.params?.routeFrom === 'AddBeneficiaryDetails') {
            navigation.navigate(NAVIGATION_TO_ADD_RECEIVE_METHOD_SCREEN, {
              routeFrom: 'AddBeneficiaryDetails',
              selectedBlock: selectedBlock,
              beneficary: res.data,
            });
          } else {
            if (
              selectedBlock === HOME_DELIVERY ||
              selectedBlock === CASH_PICKUP
            ) {
              navigation.navigate(NAVIGATION_TO_BENEFICIARY_SUCCESS_SCREEN);
            } else {
              navigation.navigate(NAVIGATION_TO_ADD_RECEIVE_METHOD_SCREEN, {
                selectedBlock: selectedBlock,
                beneficary: res.data,
              });
            }
          }
        } else {
          const msg = JSON.parse(res.data.message);
          let modalConfig = {
            message: msg.errors ? msg.errors[0].message : '',
            message_title: msg?.message,
          };
          dispatch(setError(modalConfig));
        }
        setLoading(false);
      })
      .catch(err => {
        console.log('err', err);
        setLoading(false);
        let message = 'Error while Adding beneficiary';
        try {
          message = err?.data?.message
            ? JSON.parse(err.data.message)?.message
            : 'Error while Adding beneficiary';
        } catch (error) {
          message = err.data.message;
        }
        let modalConfig = {
          message: message,
          message_title: 'Error',
        };
        dispatch(setError(modalConfig));
      });
  };

  const onPressSubmit = () => {
    console.log('beneficiary', beneficiary);
    Keyboard.dismiss();
    setLoading(true);
    const userInput = {
      firstName: beneficiary.firstName.trim(),
      lastName: beneficiary.lastName.trim(),
      country: beneficiary.country,
      // addressLine1: beneficiary.addressLine1,
      city: beneficiary.city,
      state: beneficiary.state,
      beneficiaryPhoneNumber: beneficiary.phoneNumber,
    };
    const isValidate = checkUserInputs(userInput, validator);
    if (isValidate) {
      const body = {
        ...beneficiary,
        // postalCode: beneficiary.postalCode,
        phoneNumber: `${beneficiary.phoneNumber}`,
      };
      if (isUpdate) {
        updateBeneficiary(body);
      } else {
        createBeneficiary(body);
      }
    } else {
      setLoading(false);
      const validateData = checkEmptyState(userInput);
      setValidator(prevState => ({
        ...prevState,
        ...validateData,
      }));
      const errMsg = checkErrorMessage({
        ...beneficiary,
        beneficiaryPhoneNumber: beneficiary.phoneNumber,
      });
      setErrorMessage(prevState => ({
        ...prevState,
        ...errMsg,
      }));
    }
  };

  const onSelectState = stateValue => {
    const selectedState = state.find(item => item.name === stateValue);
    setBeneficiary(prevState => ({
      ...prevState,
      state: selectedState.code,
    }));
  };

  const onSelectCountry = countryValue => {
    const selectedState = pickerCountries.find(
      item => item.name === countryValue,
    );
    setBeneficiary(prevState => ({
      ...prevState,
      country: selectedState.threeCharCode,
      city: '',
      state: '',
    }));
    setSelectedCountry(selectedState);
    api.getState(selectedState.threeCharCode).then(res => {
      console.log('getState', res);
      try {
        setState(res.data.result);
      } catch (error) {}
    });
  };

  const renderNewReceiverMethod = ({item}) => {
    return checkAvailablePayoutMethod(payoutMethod.payoutMethod, item.value) ? (
      <ExpandableBlock
        onPress={() => setSelectedBlock(item.payoutMethod)}
        containerStyle={styles.blockContainer}
        leftContent={item.icon}
        title={item.title}
        caption={item.caption}
        rightContent={
          selectedBlock === item.payoutMethod ? <Done size={30} /> : <Outline />
        }
      />
    ) : null;
  };

  return (
    <GenericView
      keyboardView
      padding
      scrollable={receiverMethodSelected}
      header={
        <Header
          title={
            route.params?.update
              ? 'Update Beneficiary'
              : 'Create New Beneficiary'
          }
        />
      }>
      {!receiverMethodSelected ? (
        <FlatList
          ListHeaderComponent={
            <React.Fragment>
              <SemiBoldText
                text="Beneficiary details"
                style={[styles.headerText]}
              />
              {!isCountrySelected && (
                <PickerModal
                  // default={false}
                  label="Please select country"
                  onValueChange={selectCountryForBeneficiary}
                  pickerValue={'name'}
                  pickOptions={countries}
                  placeholder="Select"
                  inputParentStyles={styles.inputParentStyleMarginBottom}
                />
              )}

              <RegularText
                text="Please Select receive Method"
                style={[styles.headerText]}
              />
            </React.Fragment>
          }
          extraData={pickerCountries}
          data={payoutMethod === undefined ? [] : receiveMethod}
          renderItem={renderNewReceiverMethod}
          keyExtractor={item => item.title}
          ListFooterComponent={
            <FooterButton
              disabled={!selectedBlock}
              text="Continue"
              onPress={() => setReceiverMethodSelected(true)}
            />
          }
          contentContainerStyle={styles.contentContainerStyle}
          ListFooterComponentStyle={styles.listFooterComponentStyle}
        />
      ) : (
        <KeyboardAwareView>
          <SemiBoldText
            text="Beneficiary details"
            style={[styles.headerText]}
          />
          {isHomeDeliverySelected ? (
            <View style={styles.homeDeliveryWrapper}>
              <Icon name="md-warning" size={20} style={styles.iconStyle} />
              <RegularText text="Home delivery is only avilable in Yerevan" />
            </View>
          ) : (
            <></>
          )}
          <NTextInput
            label="First Name"
            inputParentStyles={styles.inputParentStyleMarginBottom}
            onChangeText={firstName =>
              setBeneficiary(prevState => ({
                ...prevState,
                firstName: firstName,
              }))
            }
            value={beneficiary.firstName}
            hasError={validator.firstNameValidate}
            errorMessage={errorMessage.firstNameErrorMessage}
            onSubmitEditing={() => mNameInput.current.focus()}
          />

          <NTextInput
            label="Middle Name (Optional)"
            errorMessage={errorMessage.middleNameErrorMessage}
            hasError={validator.middleNameValidate}
            inputParentStyles={styles.inputParentStyleMarginBottom}
            onChangeText={middleName =>
              setBeneficiary(prevState => ({
                ...prevState,
                middleName: middleName,
              }))
            }
            value={beneficiary.middleName}
            inputRef={mNameInput}
            onSubmitEditing={() => lNameInput.current.focus()}
          />
          <NTextInput
            label="Last Name"
            inputParentStyles={styles.inputParentStyleMarginBottom}
            onChangeText={lastName =>
              setBeneficiary(prevState => ({
                ...prevState,
                lastName: lastName,
              }))
            }
            value={beneficiary.lastName}
            hasError={validator.lastNameValidate}
            errorMessage={errorMessage.lastNameErrorMessage}
            inputRef={lNameInput}
            // onSubmitEditing={() => addressInput.current.focus()}
          />

          <PickerModal
            // default={false}
            hasError={validator.countryValidate}
            label="Country"
            onValueChange={onSelectCountry}
            selectedValue={isUpdate && beneficiary.country}
            pickerValue={'name'}
            pickOptions={pickerCountries}
            placeholder="Select"
            inputParentStyles={styles.inputParentStyleMarginBottom}
          />

          {/* <NTextInput
            label="Address"
            inputParentStyles={styles.inputParentStyleMarginBottom}
            onChangeText={addressLine1 =>
              setBeneficiary(prevState => ({
                ...prevState,
                addressLine1: addressLine1,
              }))
            }
            value={beneficiary.addressLine1}
            hasError={validator?.addressLine1Validate}
            errorMessage={errorMessage.addressLine1ErrorMessage}
            inputRef={addressInput}
            onSubmitEditing={() => cityInput.current.focus()}
          /> */}

          {selectedCountry.name !== 'Kenya' && (
            <React.Fragment>
              <NTextInput
                textInputWrapper={styles.textInputWrapper(
                  isHomeDeliverySelected,
                )}
                editable={!isHomeDeliverySelected}
                label="Town/City"
                inputParentStyles={styles.inputParentStyleMarginBottom}
                onChangeText={city =>
                  setBeneficiary(prevState => ({
                    ...prevState,
                    city: city,
                  }))
                }
                value={beneficiary.city}
                hasError={validator?.cityValidate}
                errorMessage={errorMessage.cityErrorMessage}
                inputRef={cityInput}
                onSubmitEditing={() => postalInput.current.focus()}
              />
              {/* <NTextInput
                label="Postal Code"
                inputParentStyles={styles.inputParentStyleMarginBottom}
                onChangeText={postalCode => {
                  setBeneficiary(prevState => ({
                    ...prevState,
                    postalCode,
                  }));
                }}
                value={beneficiary.postalCode}
                keyboardType="number-pad"
                hasError={validator?.postalCodeValidate}
                errorMessage={errorMessage.postalCodeErrorMessage}
                inputRef={postalInput}
                onSubmitEditing={() => phoneInput.current.focus()}
              /> */}
              <PickerModal
                containerStyle={styles.textInputWrapper(isHomeDeliverySelected)}
                default={false}
                disabled={isHomeDeliverySelected}
                selectedValue={beneficiary.state}
                onPressEmptyPicker={() =>
                  Alert.alert('Please select country first.')
                }
                hasError={validator.stateValidate}
                label="Counties"
                onValueChange={onSelectState}
                pickerValue={'name'}
                pickOptions={state}
                placeholder="Select"
                inputParentStyles={styles.inputParentStyleMarginBottom}
              />
            </React.Fragment>
          )}

          {selectedCountry.name === 'Kenya' && (
            <React.Fragment>
              <PickerModal
                default={false}
                hasError={validator?.cityValidate}
                label="Counties"
                onValueChange={stateValue =>
                  setBeneficiary(prevState => ({
                    ...prevState,
                    state: stateValue,
                  }))
                }
                selectedValue={beneficiary.state}
                pickerValue={'name'}
                pickOptions={counties}
                placeholder="Select"
                inputParentStyles={styles.inputParentStyleMarginBottom}
              />

              <PickerModal
                containerStyle={styles.textInputWrapper(isHomeDeliverySelected)}
                default={false}
                disabled={isHomeDeliverySelected}
                selectedValue={beneficiary.city}
                hasError={validator.stateValidate}
                label="Town/City"
                onValueChange={cityValue => {
                  const postalCode = getPostalCodeByCity(cityValue);
                  setBeneficiary(prevState => ({
                    ...prevState,
                    postalCode,
                    city: cityValue,
                  }));
                }}
                pickerValue={'name'}
                pickOptions={cities}
                placeholder="Select"
                inputParentStyles={styles.inputParentStyleMarginBottom}
              />
            </React.Fragment>
          )}

          <RegularText
            text={'Contact details of Beneficiary'}
            style={styles.labelStyle}
          />
          <View style={styles.flexRow}>
            <NTextInput
              editable={false}
              placeholder={`+${selectedCountry.phoneCode}`}
              inputParentStyles={[
                styles.phoneCode(
                  errorMessage.phoneNumberErrorMessage ? true : false,
                ),
                styles.inputParentStyleMarginBottom,
              ]}
              keyboardType="phone-pad"
            />
            <NTextInput
              placeholder={'Enter phone number'}
              inputParentStyles={[
                styles.phoneNumberInput,
                styles.inputParentStyleMarginBottom,
              ]}
              onChangeText={phoneNumber => {
                phoneNumber = phoneNumber.slice(0, 9);
                setBeneficiary(prevState => ({
                  ...prevState,
                  phoneNumber,
                }));
              }}
              keyboardType="phone-pad"
              value={beneficiary.phoneNumber}
              hasError={validator?.beneficiaryPhoneNumberValidate}
              errorMessage={errorMessage.beneficiaryPhoneNumberErrorMessage}
              inputRef={phoneInput}
              returnKeyType={'go'}
              onSubmitEditing={onPressSubmit}
            />
          </View>
          <FooterButton
            onPressBack={() => {
              if (isUpdate) {
                navigation.goBack();
              } else {
                setReceiverMethodSelected(undefined);
                setSelectedBlock(undefined);
                setBeneficiary(beneficiary);
              }
            }}
            disabled={loading}
            text="Continue"
            onPress={onPressSubmit}
            style={styles.continueBtn}
          />
        </KeyboardAwareView>
      )}
    </GenericView>
  );
}

const styles = StyleSheet.create({
  headerText: {
    marginBottom: 10,
  },
  labelStyle: {
    marginBottom: 10,
  },
  continueBtn: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 18,
  },
  inputParentStyleMarginBottom: {
    marginBottom: 20,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  phoneCode: error => ({
    width: '18%',
    marginRight: '3%',
    paddingBottom: error ? 22 : 0,
  }),
  phoneNumberInput: {
    width: '79%', // (18+3) from phone code - 100
  },
  blockContainer: {
    marginVertical: 10,
  },
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
  homeDeliveryWrapper: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#FFFF99',
    marginBottom: 10,
    alignItems: 'center',
  },
  iconStyle: {
    color: '#999900',
    marginRight: 10,
  },
  textInputWrapper: isHomeDelivery => ({
    backgroundColor: isHomeDelivery ? '#d5d5d5' : '#fff',
  }),
});
