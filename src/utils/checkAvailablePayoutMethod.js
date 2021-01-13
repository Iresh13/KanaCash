import PropTypes from 'prop-types';

checkAvailablePayoutMethod.propTypes = {
  payoutMethod: PropTypes.array.isRequired,
  paymentMethodvalue: PropTypes.string.isRequired,
};

export default function checkAvailablePayoutMethod(
  payoutMethod,
  paymentMethodvalue,
) {
  const getAvailablePayoutMethod = value => {
    var filtered = Object.keys(payoutMethod).filter(function(key) {
      return payoutMethod[key];
    });
    const filterPayoutMethod = Object.assign(filtered);
    const checkAvaibility = filterPayoutMethod.includes(value);
    return checkAvaibility;
  };

  return getAvailablePayoutMethod(paymentMethodvalue);
}
