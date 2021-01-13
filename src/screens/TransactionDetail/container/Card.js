import React from 'react';
import {View, StyleSheet} from 'react-native';
import {MediumText} from '~/components/ui/Text';
import theme from '~/components/theme/Style';

export default function Card({children, title}) {
  return (
    <View style={styles.container}>
      <MediumText text={title} style={styles.redText} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 3,
    marginBottom: 20,
  },
  redText: {
    color: theme.red,
    marginBottom: 10,
  },
});
