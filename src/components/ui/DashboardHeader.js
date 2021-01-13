import React from 'react';
import {View, StyleSheet} from 'react-native';
import theme from '~/components/theme/Style';
import {SemiBoldText, BoldText} from '~/components/ui/Text';
import {SendMoney} from '~/components/ui/Icon';

export default function DashboardHeader({name}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.containerStyle}>
        <SemiBoldText text={`Hi, ${name}`} invert />
      </View>
      <View style={styles.bntWrapper}>
        <BoldText text="Send Money" invert style={styles.sendMoneyText} />
        <SendMoney />
      </View>
    </View>
  );
}

DashboardHeader.defaultProps = {
  name: 'John Doe',
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  containerStyle: {
    height: 180,
    width: '100%',
    backgroundColor: theme.black,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bntWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.red,
    padding: 20,
    borderRadius: 5,
    marginTop: -30,
    flexDirection: 'row',
    // position: 'absolute',
    // top: '80%',
  },
  sendMoneyText: {
    marginRight: 8,
  },
});
