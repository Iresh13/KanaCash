import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import theme from '~/components/theme/Style';
import {MediumText, RegularText, SemiBoldText} from '~/components/ui/Text';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ExpandableBlock({
  left,
  primary,
  title,
  caption,
  leftContent,
  rightContent,
  onPress,
  backgroundColor,
  containerStyle,
  content,
  style,
}) {
  const invert = primary ? primary : backgroundColor;
  return (
    <View style={[styles.container(primary, backgroundColor), style && style]}>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.topWrapper, containerStyle && containerStyle]}>
          {leftContent}
          <View style={styles.textWrapper}>
            {caption !== null ? (
              <View style={styles.titleWrapper}>
                <MediumText text={title} invert={invert} />
                {title === 'Home Delivery' && (
                  <View style={styles.homeDeliveryWrapper}>
                    <Icon
                      name="md-warning"
                      size={20}
                      style={styles.iconStyle}
                    />
                    <RegularText text="Yerevan only" />
                  </View>
                )}
              </View>
            ) : (
              <SemiBoldText text={title} invert={invert} />
            )}
            {caption && <RegularText text={caption} invert={invert} />}
          </View>
          {rightContent && (
            <View style={styles.rightContentStyle}>{rightContent}</View>
          )}
        </View>
      </TouchableOpacity>
      {content && content}
    </View>
  );
}

ExpandableBlock.defaultProps = {
  primary: false,
};

ExpandableBlock.propTypes = {
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
    marginVertical: 5,
    borderColor: '#E5E5E5',
    borderWidth: 1,
  }),
  topWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textWrapper: {
    flex: 4,
    marginHorizontal: 10,
  },
  rightContentStyle: {
    alignItems: 'flex-end',
    flex: 1,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  homeDeliveryWrapper: {
    paddingHorizontal: 4,
    flexDirection: 'row',
    backgroundColor: '#FFFF99',
    marginLeft: 10,
    alignItems: 'center',
  },
  iconStyle: {
    color: '#999900',
    marginRight: 10,
  },
});
