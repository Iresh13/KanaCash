export default (endpoints = {
  signin: '/auth/signin',
  signout: '/auth/signout',
  getWidgetToken: '/auth/widget-token',
  signup: '/auth/users',
  resendVerificationCode: 'auth/resend-verification/', //{type}
  forgotPassword: 'auth/forgot-password',
  resendDeviceVerificationCode: '',
  //
  getCurrentUser: '/senders',
  getSourceCountries: '/countries',
  getFee: '/fees',
  getExchangeRate: '/exchange-rate',
  // beneficiary
  beneficiaries: '/senders/beneficiaries',
  updateBeneficiary: '/senders/beneficiaries/update', //{beneficiary_id}
  getBeneficiariesBank: '/senders/beneficiaries/bank',
  getBankByCountry: '/banks', //{country}
  createBeneficiaryBank: '/senders/beneficiaries/bank', //POST
  //payment
  banks: '/senders/banks',
  cards: '/senders/cards',
  // payers
  getPayersList: '/payers',
  //
  transaction: '/senders/transactions',
  transactionLimit: '/senders/transactions/limit',
  state: '/states',
  glance: '/senders/transactions/glance',

  //
  license: '/license',
});

export const getDestinationCountriesApi = sourceCountry =>
  `/countries/${sourceCountry}/destinations`;

export const cancelTransactionByReferenceID = transactionReferenceId =>
  `/senders/transactions/${transactionReferenceId}`;

export const verificationApi = (type, code) => `/auth/verify/${type}/${code}`;

export const getHomeDeliveryState = (state = 'ARM') =>
  `/payers/${state}/HOME_DELIVERY`;

export const getCashPickUp = (state = 'ARM') => `/payers/${state}/CASH_PICKUP`;

export const createBeneficiaryWalletApi = beneficiary_reference_id =>
  `/senders/beneficiaries/${beneficiary_reference_id}/wallets`;
