import React, {useState} from 'react';
import {validate} from '~/utils';

function checkEmpty(value) {
  return value !== '' ? true : false;
}

const useFormInput = beneficiary => {
  const [validator, setValidator] = useState({});

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

  return validator;
};

export default useFormInput;
