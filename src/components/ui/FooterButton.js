import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Svg, {Rect, Path} from 'react-native-svg';
import {SemiBoldText} from '~/components/ui/Text';
import {useNavigation} from '@react-navigation/native';

export default function FooterButton({
  text,
  onPress,
  padding,
  disabled,
  style,
  onPressBack,
  ...touchAttributes
}) {
  const navigation = useNavigation();
  return (
    <View style={[styles.container(padding), style && style]}>
      <TouchableOpacity
        style={styles.backBtnWrapper}
        onPress={onPressBack ? onPressBack : () => navigation.goBack()}>
        <BtnBackIcon />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonStyle(disabled)}
        onPress={onPress}
        disabled={disabled}>
        <SemiBoldText invert text={text} style={styles.buttonTextStyle} />
      </TouchableOpacity>
    </View>
  );
}

FooterButton.defaultProps = {text: 'Button'};

const BtnBackIcon = () => {
  return (
    <Svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M14.2969 23.4375L5.85938 15L14.2969 6.5625"
        stroke="#027DFF"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M7.03125 15H24.1406"
        stroke="#027DFF"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

const styles = StyleSheet.create({
  container: padding => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: padding ? 15 : 0,
    paddingVertical: 10,
  }),
  backBtnWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#027DFF',
    marginRight: 10,
    borderRadius: 5,
    height: 50,
    width: 50,
  },
  buttonStyle: disabled => ({
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    opacity: disabled ? 0.4 : 1,
    borderColor: disabled ? '#d3d3d3' : '#027DFF',
    backgroundColor: disabled ? '#d3d3d3' : '#027DFF',
    borderRadius: 5,
    flex: 1,
    padding: 12,
  }),
  buttonTextStyle: {
    textAlign: 'center',
  },
});
