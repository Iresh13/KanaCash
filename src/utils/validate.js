const validate = {
  email: text => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      return true;
    }
  },

  phoneNumber: text => {
    var reg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (reg.test(text)) {
      return true;
    } else {
      return false;
    }
  },

  beneficiaryPhoneNumber: text => {
    var reg = /^\d{9}$/;
    if (reg.test(text)) {
      return true;
    } else {
      return false;
    }
  },

  walletIdentificationValue: text => {
    var reg = /^\d{9}$/;
    if (reg.test(text)) {
      return true;
    } else {
      return false;
    }
  },
  // Minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character:
  password: text => {
    var strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*)(+=._-])(?=.{6,})',
    );
    if (strongRegex.test(text)) {
      return true;
    } else {
      return false;
    }
  },

  postalCode: text => {
    var regx = /^[0-9]{4}$/;
    if (regx.test(text)) {
      return true;
    } else {
      return false;
    }
  },

  text: text => {
    var reg = /^[a-zA-Z ]*$/;
    if (reg.test(text)) {
      return true;
    } else {
      return false;
    }
  },
};

export default validate;
