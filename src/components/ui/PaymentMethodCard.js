import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import theme from '~/components/theme/Style';
import {MediumText, RegularText, BoldText} from '~/components/ui/Text';
import {Number} from '~/components/ui/Icon';
import PropTypes from 'prop-types';

export default function PaymentMethodCard({
  title,
  caption,
  leftContent,
  backgroundColor,

  cardType,
  num,
  first,
  second,
  onPressRemove,
}) {
  const paymentType = status => {
    let text = {
      first: 'hello ',
      second: '',
      button: '',
    };
    switch (status) {
      case 'bank':
        text = {
          first: 'Account Holder: ',
          second: 'Account Type: ',
          button: 'Remove Bank',
        };
        break;
      case 'debt':
        text = {
          first: 'Nick Name: ',
          second: 'Network: ',
          button: 'Remove Card',
        };
        break;

      default:
        text = {
          first: '',
          second: '',
          third: '',
        };
    }
    return {text};
  };

  return (
    <View style={styles.container}>
      <Number style={styles.numberStyle} num={num} />
      <View style={styles.textWrapper}>
        <MediumText text={title} />
        <View style={styles.row}>
          <RegularText text={paymentType(cardType).text.first} />
          <MediumText text={first} numberOfLines={1} style={{flex: 2}} />
        </View>
        <View style={styles.row}>
          <RegularText text={paymentType(cardType).text.second} />
          <MediumText text={second} />
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={onPressRemove}>
            <RegularText text={paymentType(cardType).text.button} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.rightContentStyle} />
    </View>
  );
}

PaymentMethodCard.defaultProps = {};

PaymentMethodCard.propTypes = {
  onPress: PropTypes.func,
  cardType: PropTypes.oneOf(['debt', 'bank']).isRequired,
  onPressRemove: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    borderRadius: theme.defaultRadius,
    backgroundColor: theme.white,
    paddingHorizontal: 10,
    paddingVertical: 12,
    flexDirection: 'row',
    // alignItems: 'center',
    marginVertical: 5,
  },
  textWrapper: {
    marginHorizontal: 10,
  },
  rightContentStyle: {
    alignItems: 'flex-end',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  numberStyle: {
    marginTop: 5,
    backgroundColor: '#B6C0C9',
  },
});
