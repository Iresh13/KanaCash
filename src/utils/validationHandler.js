import validate from './validate';

export const checkEmptyState = state => {
  var emptyState;
  Object.keys(state).map((field, index) => {
    if (
      state[field] === null ||
      state[field] === '' ||
      state[field] == undefined
    ) {
      let validateData = `${field}Validate`;
      emptyState = {...emptyState, [validateData]: true};
    }
  });
  return emptyState;
};

export const checkUserInputs = (userInputs, validator) => {
  const checkUserInput =
    Object.keys(userInputs).filter(field => userInputs[field] === '').length ===
    0
      ? true
      : false;
  const formValuesValid =
    Object.keys(validator).filter(field => validator[field] == true).length ===
    0
      ? true
      : false;
  return checkUserInput && formValuesValid;
};

export const checkErrorMessage = state => {
  let errorMessageState;
  Object.keys(state).map((field, index) => {
    console.log('state[field]', field);
    if (
      state[field] === null ||
      state[field] === '' ||
      state[field] === undefined
    ) {
      let errorMessage = `${field}ErrorMessage`;
      let message;
      message = 'This field cannot be empty.';
      errorMessageState = {...errorMessageState, [errorMessage]: message};
    } else if (field === 'email' && !validate.email(state[field])) {
      //email
      let errorMessage = `${field}ErrorMessage`;
      const message = 'Please enter a valid email address.';
      errorMessageState = {...errorMessageState, [errorMessage]: message};
    } else if (field === 'phoneNumber' && !validate.phoneNumber(state[field])) {
      //phonenumber
      let errorMessage = `${field}ErrorMessage`;
      const message = 'Please enter a valid phone number.';
      errorMessageState = {...errorMessageState, [errorMessage]: message};
    } else if (field === 'firstName' && !validate.text(state[field])) {
      //first name text only
      let errorMessage = `${field}ErrorMessage`;
      const message = 'Please enter a valid first name.';
      errorMessageState = {...errorMessageState, [errorMessage]: message};
    } else if (field === 'middleName' && !validate.text(state[field])) {
      //middle name text only
      let errorMessage = `${field}ErrorMessage`;
      const message = 'Please enter a valid middle name.';
      errorMessageState = {...errorMessageState, [errorMessage]: message};
    } else if (field === 'lastName' && !validate.text(state[field])) {
      //last name text only
      let errorMessage = `${field}ErrorMessage`;
      let message = 'Please enter a valid last name.';
      errorMessageState = {...errorMessageState, [errorMessage]: message};
    } else if (field === 'password' && !validate.password(state[field])) {
      // password
      let errorMessage = `${field}ErrorMessage`;
      let message =
        'The password must contain mix of lowercase, uppercase, number, symbol and 6 characters minimum.';
      errorMessageState = {...errorMessageState, [errorMessage]: message};
    } else if (state.password !== state.confirmPassword) {
      // confirm password
      let errorMessage = 'confirmPasswordErrorMessage';
      let message = "Password doesn't match";
      errorMessageState = {...errorMessageState, [errorMessage]: message};
    } else if (field === 'country' && !validate.text(state[field])) {
      // country
      let errorMessage = `${field}ErrorMessage`;
      let message = 'Please enter a valid country.';
      errorMessageState = {...errorMessageState, [errorMessage]: message};
    } else if (field === 'postalCode' && !validate.text(state[field])) {
      //postal code//postalCode
      let errorMessage = `${field}ErrorMessage`;
      let message = 'Please enter a valid postal code.';
      errorMessageState = {...errorMessageState, [errorMessage]: message};
    } else if (
      field === 'beneficiaryPhoneNumber' &&
      !validate.beneficiaryPhoneNumber(state[field])
    ) {
      console.log('beneficiaryPhoneNumber', `${field}ErrorMessage`);
      //beneficaryphonenumber
      let errorMessage = `${field}ErrorMessage`;
      const message = 'Please enter a valid phone number.';
      errorMessageState = {...errorMessageState, [errorMessage]: message};
    } else if (!validate.text(state[field])) {
      let errorMessage = `${field}ErrorMessage`;
      let message = 'Please enter a valid data.';
      errorMessageState = {...errorMessageState, [errorMessage]: message};
    }
  });
  return errorMessageState;
};
