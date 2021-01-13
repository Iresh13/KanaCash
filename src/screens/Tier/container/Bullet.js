import React from 'react';
import {View, StyleSheet} from 'react-native';
import {RegularText} from '~/components/ui/Text';

export default function Bullet({text}) {
  return (
    <View style={styles.bulletRow}>
      <View style={styles.bullet} />
      <RegularText text={text} />
    </View>
  );
}

const styles = StyleSheet.create({
  bulletRow: {
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bullet: {
    backgroundColor: '#000',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
});
