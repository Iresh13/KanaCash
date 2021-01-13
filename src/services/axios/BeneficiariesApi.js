import axios from 'axios';
import endpoints, {
  getHomeDeliveryState,
  getCashPickUp,
  createBeneficiaryWalletApi,
} from './endpoints';

// Get all Beneficiaries
export const getBeneficiaries = () => {
  const options = {
    url: endpoints.beneficiaries,
    data: null,
    method: 'get',
  };
  return axios(options);
};

// Create Beneficiary
export const createBeneficiary = body => {
  const options = {
    url: endpoints.beneficiaries,
    data: body,
    method: 'post',
  };
  return axios(options);
};

// update Beneficiary
export const updateBeneficiary = (body, beneficiary_id) => {
  const options = {
    url: `${endpoints.updateBeneficiary}/${beneficiary_id}`,
    data: body,
    method: 'put',
  };
  return axios(options);
};

// Get all Beneficiaries Bank
export const getBeneficiariesBank = body => {
  const options = {
    url: endpoints.getBeneficiariesBank,
    data: body,
    method: 'post',
  };
  return axios(options);
};

// Create Beneficiary Bank
export const createBeneficiaryBank = body => {
  const options = {
    url: endpoints.createBeneficiaryBank,
    data: body,
    method: 'post',
  };
  return axios(options);
};

//Get all List of Banks by Country
export const getBanksByCountry = (country = 'ARM') => {
  const options = {
    url: `${endpoints.getBankByCountry}/${country}`,
    data: null,
    method: 'get',
  };
  return axios(options);
};

// Get Payers List
export const getPayersList = payerState => {
  const options = {
    url: getCashPickUp('ARM'),
    data: null,
    method: 'get',
  };
  return axios(options);
};

export const getHomeDeliveryStateApi = state => {
  const options = {
    url: getHomeDeliveryState(state),
    data: null,
    method: 'get',
  };
  return axios(options);
};

// Create Beneficiary Bank
export const createBeneficiaryWallet = (beneficiary_reference_id, body) => {
  const options = {
    url: createBeneficiaryWalletApi(beneficiary_reference_id),
    data: body,
    method: 'post',
  };
  return axios(options);
};
