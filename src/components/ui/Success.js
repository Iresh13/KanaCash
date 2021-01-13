import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {BoldText, RegularText} from '~/components/ui/Text';
import Button from '~/components/ui/Button';
import theme from '~/components/theme/Style';

Success.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};

Success.defaultProps = {
  onPress: () => {},
  btnText: 'Continue',
};

export default function Success({
  icon,
  title,
  caption,
  onPress,
  btnText,
  containerStyle,
  attributes,
  buttonWidth,
}) {
  return (
    <View style={styles.containerStyle}>
      {icon}
      <BoldText text={title} style={styles.titleText} />
      <RegularText style={styles.descriptionText} text={caption} />
      {onPress && (
        <Button
          text={btnText}
          onPress={onPress}
          style={styles.loginBtn}
          buttonWidth={buttonWidth}
          {...attributes}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    marginVertical: 10,
    color: theme.secondaryColor,
  },
  descriptionText: {
    marginBottom: 25,
    textAlign: 'center',
  },
});
