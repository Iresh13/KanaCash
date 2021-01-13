import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {BoldText, RegularText} from '~/components/ui/Text';
import {InfoIcon} from '~/components/ui/Icon';
import theme from '~/components/theme/Style';
import {layoutAnimation} from '~/presentation';
import Svg, {Path} from 'react-native-svg';
import {FlatList} from 'react-native-gesture-handler';

const ArrowUp = () => {
  return (
    <View style={styles.arrowUp}>
      <Svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M21.213 10.6067L-0.00015986 10.6067L10.6064 8.70228e-05L21.213 10.6067Z"
          fill="#5C5C5C"
          // fill="#fff"
        />
      </Svg>
    </View>
  );
};

export default function HorizontalView({
  symbol,
  amount,
  icon,
  caption,
  data,
  senderAmount,
  currency,
}) {
  const [active, setActive] = React.useState(false);

  const renderFee = ({item}) => {
    return item.feeRanges !== undefined ? (
      <View style={styles.infoTextWrapper}>
        <RegularText
          text={`${item.paymentMethod.replace(
            '_',
            ' ',
          )} - ${item.payoutMethod.replace('_', ' ')}(${item.currency})`}
          style={styles.infoText}
          invert
        />
        <RegularText
          text={
            item.feeRanges?.flatFee !== undefined ? item.feeRanges.flatFee : '0'
          }
          style={styles.infoText}
          invert
        />
      </View>
    ) : null;
  };

  return (
    <View>
      <View style={styles.row}>
        <View style={[styles.circleStyle]}>
          <BoldText text={symbol} invert style={styles.textStyle} />
        </View>
        <BoldText
          text={amount === Infinity ? 0 : amount}
          style={styles.boldText}
        />
        <BoldText text={` ${currency}`} />
        <BoldText text={caption} style={styles.semiText} />
        {icon && (
          <TouchableOpacity
            onPress={() => {
              setActive(!active);
              layoutAnimation();
            }}>
            <InfoIcon />
          </TouchableOpacity>
        )}
      </View>
      {active && (
        <View style={styles.infoContainer}>
          <FlatList
            data={data}
            renderItem={renderFee}
            keyExtractor={(item, index) => `${index}-${item.paymentMethod}`}
          />
          <ArrowUp />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  circleStyle: {
    backgroundColor: theme.primaryColor,
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    marginRight: 10,
  },
  textStyle: {
    fontSize: 35,
    textAlign: 'center',
  },
  amountWrapper: {
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  semiText: {fontWeight: '200', fontSize: 18, marginHorizontal: 10},
  infoContainer: {
    backgroundColor: '#5C5C5C',
    padding: 20,
    marginBottom: 20,
    borderRadius: theme.defaultRadius,
  },
  infoTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  infoText: {
    fontWeight: '500',
    fontSize: 13,
  },
  arrowUp: {
    ...StyleSheet.absoluteFillObject,
    left: '79%',
    top: '-3%',
  },
});
