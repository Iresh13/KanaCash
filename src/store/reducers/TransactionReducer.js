import {
  CREATE_TRANSACTION_DATA,
  CLEAR_TRANSACTION_DATA,
} from '../actions/constant/ActionTypes';

const INITIAL_STATE = {
  // feeAmount: undefined,
  // exchangeRate: undefined,
  // senderAmount: undefined,
  // recipientAmount: undefined,
  // recipientCurrency: undefined,
  // destinationCountry: undefined,
  // recipientId: undefined,
  // payoutMethod: undefined,
  // fundingSource: undefined,
  // senderFundingAccountId: undefined,
  // recipientBankId: undefined,
};

const SuccessReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_TRANSACTION_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_TRANSACTION_DATA:
      return {
        state,
      };

    default:
      return state;
  }
};

export default SuccessReducer;
