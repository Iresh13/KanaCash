import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import theme from '~/components/theme/Style';
import {MediumText, RegularText, SemiBoldText} from '~/components/ui/Text';

export default function TransctionBlock({
  left,
  primary,
  title,
  caption,
  leftContent,
  rightContent,
  onPress,
  backgroundColor,
  rightContentStyle,
  status,
  statusColor,
}) {
  const invert = primary ? primary : backgroundColor;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container(primary, backgroundColor)]}>
        {leftContent}
        <View style={styles.textWrapper}>
          <View style={styles.rowContainer}>
            <View>
              <MediumText text={title} invert={invert} />
              <View style={styles.statusStyle}>
                <View style={styles.dotStyle(statusColor)} />
                <RegularText
                  text={status}
                  invert={invert}
                  style={styles.statusTextStyle(statusColor)}
                />
              </View>
            </View>
            <View style={[styles.rightContentStyle, rightContentStyle]}>
              {rightContent}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

TransctionBlock.defaultProps = {
  primary: false,
  statusColor: '#d3d3d3',
};

TransctionBlock.propTypes = {
  leftContent: PropTypes.element,
  rightContent: PropTypes.element,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: (primary, backgroundColor) => ({
    borderRadius: theme.defaultRadius,
    backgroundColor: primary
      ? theme.primaryColor
      : backgroundColor
      ? backgroundColor
      : theme.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    justifyContent: 'space-between',
  }),
  textWrapper: {
    marginHorizontal: 10,
    flex: 3,
  },
  rowContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  rightContentStyle: {
    flex: 1,
    alignItems: 'flex-end',
  },
  statusStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  dotStyle: statusColor => ({
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: statusColor,
    marginRight: 8,
  }),
  statusTextStyle: statusColor => ({
    color: statusColor,
  }),
});
