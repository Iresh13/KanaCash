import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RegularText} from '~/components/ui/Text';
import theme from '~/components/theme/Style';

export default function Box({
  titleFirst,
  titleSecond,
  titleThird,
  first,
  second,
  third,
}) {
  return (
    <View style={styles.boxContainer}>
      <View style={styles.row}>
        <RegularText text={`${titleFirst}: `} invert />
        <RegularText
          text={`${first}`}
          invert
          style={{flex: 1}}
          numberOfLines={1}
        />
      </View>
      <View style={styles.row}>
        <RegularText text={`${titleSecond}: `} invert />
        <RegularText text={`${second}`} invert />
      </View>
      <View style={styles.row}>
        <RegularText text={`${titleThird}: `} invert />
        <RegularText text={`${third}`} invert />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    padding: 15,
    backgroundColor: theme.primaryColor,
    borderRadius: theme.defaultRadius,
    marginTop: -12,
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});
