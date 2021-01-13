const LEVEL1 = 'LEVEL1';
const LEVEL2 = 'LEVEL2';
const LEVEL3 = 'LEVEL3';

const checkTransactionLimit = (transactionLimit, amount) => {
  var result = {};
  const senderLimit = transactionLimit?.senderLimit;
  switch (transactionLimit?.currentTier) {
    case LEVEL1:
      if (amount <= senderLimit && amount <= 500) {
        result = {
          status: true,
          message: '',
        };
      } else {
        let message = `Maximum amount is ${
          senderLimit < 500 ? senderLimit : 500
        }`;
        result = {
          status: false,
          message: message,
        };
      }
      break;
    case LEVEL2:
      if (amount <= senderLimit && amount <= 1000) {
        result = {
          status: true,
          message: '',
        };
      } else {
        let message = `Maximum amount is ${
          senderLimit < 1000 ? senderLimit : 1000
        }`;
        result = {
          status: false,
          message: message,
        };
      }
      break;
    case LEVEL3:
      if (amount <= senderLimit && amount <= 3000) {
        result = {
          status: true,
          message: '',
        };
      } else {
        let message = `Maximum amount is ${
          senderLimit < 3000 ? senderLimit : 3000
        }`;
        result = {
          status: false,
          message: message,
        };
      }
      break;
    default:
      result = {
        status: false,
        message: '',
      };
      break;
  }
  return result;
};

export default checkTransactionLimit;

// upto $500 per transaction
// upto $500 per daily
// upto $1,000 per 15 days
// upto $1,000 per 30 days
// upto $3,000 per 6 months
// Tier 2
// upto $1,000 per transaction
// upto $2,999 per day
// upto $2,999 per 15 days
// upto $5,000 per 30 days
// upto $9,999 per 6 months
// Tier 3
// upto $2,000 per transaction
// upto $3,000 per day
// upto $6,000 per 15 days
// upto $10,000 per 30 days
// upto $30,000 per 6 months
