import React from 'react';
import {
  Cash,
  Outline,
  BankDeposit,
  HomeDelivery,
  Wallet,
  Done,
  Beneficiary,
} from '~/components/ui/Icon';

export const CASH_PICKUP = 'CASH_PICKUP';
export const BANK_DEPOSIT = 'BANK_DEPOSIT';
export const HOME_DELIVERY = 'HOME_DELIVERY';
export const WALLET = 'WALLET';

const receiveMethod = [
  {
    id: 1,
    icon: <Cash />,
    payoutMethod: CASH_PICKUP,
    title: 'Cash Pickup',
    caption: 'Pick up money from cash pick up locations',
    component: '',
  },
  {
    id: 3,
    payoutMethod: HOME_DELIVERY,
    icon: <HomeDelivery />,
    title: 'Home Delivery',
    caption: "Get the money delivered to beneficiary's home",
  },
  {
    id: 2,
    payoutMethod: BANK_DEPOSIT,
    icon: <Beneficiary />,
    title: 'New Beneficiary',
    caption: null,
  },
  {
    id: 4,
    payoutMethod: WALLET,
    icon: <Wallet />,
    title: 'Wallet',
    caption: "Deposit money in beneficiary's wallet",
  },
];

export const walletConfig = country =>
  country === 'KEN'
    ? "Deposit money in beneficiary's M-Pesa Wallet"
    : "Deposit money in beneficiary's MTN Wallet";

export default receiveMethod;
