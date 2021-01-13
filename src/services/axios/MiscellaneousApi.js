import axios from 'axios';
import endpoints, {getDestinationCountriesApi} from './endpoints';

export const getDestinationCountries = sourceCountry => {
  const options = {
    url: getDestinationCountriesApi(sourceCountry),
    data: null,
    method: 'get',
  };
  return axios(options);
};

export const getSourceCountries = () => {
  const options = {
    url: endpoints.getSourceCountries,
    data: null,
    method: 'get',
  };
  return axios(options);
};

export const getExchangeRate = () => {
  const options = {
    url: endpoints.getExchangeRate,
    data: null,
    method: 'get',
  };
  return axios(options);
};

export const getFee = () => {
  const options = {
    url: endpoints.getFee,
    data: null,
    method: 'get',
  };
  return axios(options);
};

export const getState = state => {
  const options = {
    url: `${endpoints.state}/${state}`,
    data: null,
    method: 'get',
  };
  return axios(options);
};
