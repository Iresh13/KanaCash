import React from 'react';
import {Text, StyleSheet} from 'react-native';

import theme from '~/components/theme/Style';

/**
 * normal text
 */
export const RegularText = props => {
  return (
    <Text
      {...props}
      style={[styles.regularText, props.invert && styles.invert, props.style]}>
      {props.text}
    </Text>
  );
};

/**
 *
 */
export const MediumText = props => {
  return (
    <Text
      {...props}
      style={[styles.mediumText, props.invert && styles.invert, props.style]}>
      {props.text}
    </Text>
  );
};

/**
 * use this Name | TITEL
 */
export const SemiBoldText = props => {
  return (
    <Text
      {...props}
      style={[styles.semiboldText, props.invert && styles.invert, props.style]}>
      {props.text}
    </Text>
  );
};

/**
 * use this component for HEADER | TITEL
 */
export const BoldText = props => {
  return (
    <Text
      {...props}
      style={[styles.boldText, props.invert && styles.invert, props.style]}>
      {props.text}
    </Text>
  );
};

/**
 * use this component for Label | Placeholder
 */
export const LightText = props => {
  return (
    <Text
      {...props}
      style={[styles.lightText, props.invert && styles.invert, props.style]}>
      {props.text}
    </Text>
  );
};

const styles = StyleSheet.create({
  lightText: {
    fontFamily: theme.themeFontLight,
    fontSize: theme.baseFontSize,
    lineHeight: 22,
    color: theme.fontColor,
  },
  regularText: {
    fontFamily: theme.themeFontRegular,
    fontSize: theme.fontSizeRegular,
    lineHeight: 20,
    color: theme.fontColor,
  },
  mediumText: {
    fontFamily: theme.themeFontMedium,
    fontSize: theme.fontSizeMedium,
    lineHeight: 22,
    color: theme.fontDark,
    fontWeight: '500',
  },
  semiboldText: {
    fontFamily: theme.themeFontSemiBold,
    fontSize: theme.fontSizeSemiBold,
    lineHeight: 25,
  },
  boldText: {
    fontFamily: theme.themeFontBold,
    fontSize: theme.fontSizeBold,
    fontWeight: '600',
    lineHeight: 41,
  },
  invert: {
    color: '#fff',
  },
});
