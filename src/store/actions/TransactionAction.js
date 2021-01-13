import {
  CREATE_TRANSACTION_DATA,
  CLEAR_TRANSACTION_DATA,
} from './constant/ActionTypes';

export const createTransactionData = transactionData => dispatch => {
  dispatch({
    type: CREATE_TRANSACTION_DATA,
    payload: transactionData,
  });
};

export const clearTransactionData = () => dispatch => {
  dispatch({
    type: CLEAR_TRANSACTION_DATA,
  });
};
