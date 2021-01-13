import axios from 'axios';
import endpoints from './endpoints';

// Bank and Card
export const getBanks = () => {
  const options = {
    url: `${endpoints.banks}`,
    data: null,
    method: 'get',
  };
  return axios(options);
};

export const getCards = () => {
  const options = {
    url: `${endpoints.cards}`,
    data: null,
    method: 'get',
  };
  return axios(options);
};

export const removeBank = bankId => {
  const options = {
    url: `${endpoints.banks}/${bankId}`,
    data: null,
    method: 'delete',
  };
  return axios(options);
};

export const removeCard = cardId => {
  const options = {
    url: `${endpoints.cards}/${cardId}`,
    data: null,
    method: 'delete',
  };
  return axios(options);
};
