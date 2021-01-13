import axios from 'axios';
import endpoints, {
  getDestinationCountriesApi,
  cancelTransactionByReferenceID,
  verificationApi,
} from './endpoints';

// Create Transaction
export const createTransaction = transactionDetails => {
  const options = {
    url: endpoints.transaction,
    data: transactionDetails,
    method: 'post',
  };
  return axios(options);
};

// Get all Transaction
export const getTransaction = params => {
  const options = {
    url: `${endpoints.transaction}?page=${params.page}&pageSize=${
      params.pageSize
    }`,
    data: null,
    method: 'get',
  };
  return axios(options);
};

// Cancel Transaction
export const cancelTransaction = transactionReferenceId => {
  const options = {
    url: cancelTransactionByReferenceID(transactionReferenceId),
    data: null,
    method: 'get',
  };
  return axios(options);
};

// Get Sender transaction Limit
export const transactionLimit = () => {
  const options = {
    url: endpoints.transactionLimit,
    data: null,
    method: 'get',
  };
  return axios(options);
};

export const getLicense = country => {
  const options = {
    url: `${endpoints.license}/${country}`,
    data: null,
    method: 'get',
  };
  return axios(options);
};

export const getGlance = () => {
  const options = {
    url: endpoints.glance,
    data: null,
    method: 'get',
  };
  return axios(options);
};
