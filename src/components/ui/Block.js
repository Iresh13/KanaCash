import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import theme from '~/components/theme/Style';
import {MediumText, RegularText, SemiBoldText} from '~/components/ui/Text';

export default function Block({
  left,
  primary,
  title,
  caption,
  leftContent,
  rightContent,
  onPress,
  backgroundColor,
  rightContentStyle,
}) {
  const invert = primary ? primary : backgroundColor;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container(primary, backgroundColor)]}>
        {leftContent}
        <View style={styles.textWrapper}>
          <View style={{flexDirection: 'row'}}>
            <View style={{}}>
              {caption ? (
                <MediumText text={title} invert={invert} />
              ) : (
                <SemiBoldText text={title} invert={invert} />
              )}
              {caption && <RegularText text={caption} invert={invert} />}
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

Block.defaultProps = {
  primary: false,
};

Block.propTypes = {
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
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'space-between',
  }),
  textWrapper: {
    marginHorizontal: 10,
    flex: 3,
  },
  rightContentStyle: {
    flex: 1,
    alignItems: 'flex-end',
  },
  statusStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
});
