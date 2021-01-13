const FILTERED_STATUS = {
  HOLD: 'HOLD',
  PENDING: 'PENDING',
  CANCELED: 'CANCELED',
  PAID: 'PAID',
  READY_FOR_PAYOUT: 'READY FOR PAYOUT',
  DELIVERY_FAILED: 'CANCELED',
};

const DELIVERY_STATUS = {
  HOLD: 'HOLD',
  PENDING: 'PENDING',
  CANCELED: 'CANCELED',
  DELIVERED: 'DELIVERED',
  DELIVERY_REQUESTED: 'DELIVERY_REQUESTED',
  DELIVERY_PAYOUT_READY: 'DELIVERY_PAYOUT_READY',
  DELIVERY_FAILED: 'DELIVERY_FAILED',
};

const TRANSACTION_STATUS = {
  FAILED: 'FAILED',
  CANCELED: 'CANCELED',
};

const checkReceiptNumber = receiptNumber => {
  return receiptNumber === null || receiptNumber === DELIVERY_STATUS.PENDING;
};

const checkTransactionFailed = transactionStatus => {
  return (
    transactionStatus === TRANSACTION_STATUS.FAILED ||
    transactionStatus === TRANSACTION_STATUS.CANCELED
  );
};

export default (checkTransactionStatus = transaction => {
  if (checkTransactionFailed(transaction.status)) {
    return FILTERED_STATUS.CANCELED;
  }
  if (checkReceiptNumber(transaction.receiptNumber)) {
    return DELIVERY_STATUS.PENDING;
  }
  const status = {
    [DELIVERY_STATUS.HOLD]: FILTERED_STATUS.HOLD,
    [DELIVERY_STATUS.PENDING]: FILTERED_STATUS.PENDING,
    [DELIVERY_STATUS.CANCELED]: FILTERED_STATUS.CANCELED,
    [DELIVERY_STATUS.DELIVERED]: FILTERED_STATUS.PAID,
    [DELIVERY_STATUS.DELIVERY_REQUESTED]: FILTERED_STATUS.READY_FOR_PAYOUT,
    [DELIVERY_STATUS.DELIVERY_PAYOUT_READY]: FILTERED_STATUS.READY_FOR_PAYOUT,
    [DELIVERY_STATUS.DELIVERY_FAILED]: FILTERED_STATUS.DELIVERY_FAILED,
  };
  return status[transaction.deliveryStatus];
});

export const statusStyle = status => {
  let color = '';
  switch (status) {
    case FILTERED_STATUS.HOLD:
      color = 'gray';
      break;
    case FILTERED_STATUS.READY_FOR_PAYOUT:
      color = '#28A745';
      break;
    case FILTERED_STATUS.CANCELED:
      color = '#DC3545';
      break;
    case FILTERED_STATUS.PENDING:
      color = '#FFC107';
      break;
    case FILTERED_STATUS.PAID:
      color = '#26A3E0';
      break;
    case FILTERED_STATUS.DELIVERY_FAILED:
      color = '#a82e2e';
      break;
    default:
      color = '#000';
  }
  return color;
};
