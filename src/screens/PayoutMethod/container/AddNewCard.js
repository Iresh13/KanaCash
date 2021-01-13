import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {RegularText} from '~/components/ui/Text';
import theme from '~/components/theme/Style';
import PropTypes from 'prop-types';

export default function AddNewCard({onPress, text}) {
  return (
    <TouchableOpacity style={[styles.row]} onPress={onPress}>
      <RegularText text="or, " style={styles.primaryText} />
      <RegularText text={text} style={styles.secondaryText} />
    </TouchableOpacity>
  );
}

AddNewCard.propTypes = {text: PropTypes.string.isRequired};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryText: {
    color: theme.primaryColor,
    fontWeight: '500',
  },
  secondaryText: {color: theme.red, fontWeight: '500'},
});
