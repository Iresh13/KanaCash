import React, {useState, useEffect} from 'react';
import {
  View,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import PropTypes from 'prop-types';
import {SvgCssUri} from 'react-native-svg';
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import ShadowView from 'react-native-simple-shadow-view';
import {RegularText, MediumText} from '~/components/ui/Text';
import themeStyle from '~/components/theme/Style';
import theme from '~/components/theme/Style';

PickerModal.defaultProps = {
  pickerValue: 'name',
  onValueChange: () => {},
  default: true,
  onPressEmptyPicker: () => {},
};

PickerModal.propTypes = {
  onValueChange: PropTypes.func.isRequired,
};

export default function PickerModal(props) {
  const [selectedValue, setSelectedValue] = useState('');
  const [displayPicker, setDisplayPicker] = useState(false);

  React.useEffect(() => {
    if (props.value) {
      setSelectedValue(props.value[props.pickerValue]);
    }
    if (props.selectedValue) {
      setSelectedValue(props.selectedValue);
    }
  }, [props.value, props.selectedValue]);

  const confirmHandler = () => {
    if (selectedValue === '') {
      if (props.pickOptions.length > 0) {
        setSelectedValue(props.pickOptions[0][props.pickerValue]);
        props.onValueChange(props.pickOptions[0][props.pickerValue]);
      } else {
        props.onValueChange('');
      }
    } else {
      props.onValueChange(selectedValue);
    }
    setDisplayPicker(false);
  };

  // if default the selected value will be first index of array
  useEffect(() => {
    if (props.default) {
      if (props.pickOptions.length !== 0) {
        const getFirstIndex = props.pickOptions[0][props.pickerValue];
        setSelectedValue(getFirstIndex);
        props.onValueChange(getFirstIndex);
      }
    }
  }, [props.pickOptions]);

  const items = props.pickOptions.map((item, id) => (
    <Picker.Item
      key={id}
      label={item[props.pickerValue]}
      value={item[props.pickerValue]}
    />
  ));

  const getImageUrl = React.useCallback(() => {
    if (props.pickOptions) {
      const findImage = props.pickOptions.find(
        item => item[props.pickerValue] === selectedValue,
      );
      return findImage?.flagUrl;
    } else {
      return '';
    }
  }, [props.pickOptions, selectedValue]);

  const onPressTouchable = () => {
    if (props.pickOptions.length >= 1) {
      Platform.OS === 'android' ? null : setDisplayPicker(true);
    } else {
      props.onPressEmptyPicker && props.onPressEmptyPicker();
    }
  };

  return (
    <View style={[styles.container, props.inputParentStyles]}>
      {props.label && (
        <RegularText text={props.label} style={styles.labelStyle} />
      )}
      {Platform.OS === 'ios' ? (
        <TouchableWithoutFeedback
          disabled={props.disabled}
          onPress={onPressTouchable}>
          <ShadowView
            style={[
              styles.shadowViewStyle(props.hasError),
              props.containerStyle && props.containerStyle,
            ]}>
            {props.flag && (
              <View style={styles.flagWrapper}>
                <SvgCssUri width="40" height="40" uri={getImageUrl()} />
              </View>
            )}
            <RegularText
              text={
                props.defaultSelectedValue
                  ? props.defaultSelectedValue
                  : selectedValue !== ''
                  ? selectedValue
                  : props.placeholder
              }
              style={[
                styles.placeholderStyle,
                props.placeholderStyle && props.placeholderStyle,
              ]}
            />
            <Icon
              name="arrow-down"
              size={12}
              style={[
                styles.icon,
                props.placeholderStyle && props.placeholderStyle,
              ]}
            />

            {displayPicker && (
              <Modal
                animationType="slide-in"
                transparent={true}
                visible={displayPicker}>
                <View style={styles.backDrop}>
                  <View style={styles.pickerView}>
                    <View style={styles.pickerTitle}>
                      <MediumText
                        text={props.label}
                        style={styles.pickerLabelTitle}
                      />
                    </View>
                    <Picker
                      onValueChange={(itemValue, itemPosition) => {
                        setSelectedValue(itemValue);
                      }}
                      selectedValue={selectedValue}
                      style={styles.pickerStyle}>
                      {items}
                    </Picker>
                    <View style={styles.pickerConfirm}>
                      <TouchableOpacity onPress={() => confirmHandler()}>
                        <MediumText text="Done" style={styles.buttonText} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            )}
          </ShadowView>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback
          disabled={props.disabled}
          onPress={onPressTouchable}>
          <ShadowView
            style={[
              styles.shadowViewStyle(props.hasError),
              props.containerStyle && props.containerStyle,
            ]}>
            {props.flag && (
              <View style={styles.flagWrapperAndroid}>
                <SvgCssUri width="40" height="40" uri={getImageUrl()} />
              </View>
            )}
            <Icon
              name="arrow-down"
              size={12}
              style={[
                styles.androidPickerIcon,
                props.placeholderStyle && props.placeholderStyle,
              ]}
            />
            <Picker
              prompt={props.label}
              mode="dialog"
              enabled={props.pickOptions.length !== 0 && !props.disabled}
              onValueChange={(itemValue, itemPosition) => {
                setSelectedValue(itemValue);
                props.onValueChange(itemValue);
              }}
              selectedValue={selectedValue}
              style={[
                styles.androidPickerStyle,
                props.placeholderStyle && props.placeholderStyle,
              ]}>
              {items}
            </Picker>
          </ShadowView>
        </TouchableWithoutFeedback>
      )}
      {props.hasError && props.errorMessage ? (
        <RegularText text={props.errorMessage} style={styles.errorMsg} />
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  shadowViewStyle: hasError => ({
    borderRadius: 5,
    backgroundColor: themeStyle.white,
    borderWidth: 1,
    borderColor: hasError ? '#FF0000' : '#d3d3d3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 52,
    paddingHorizontal: 10,
    ...Platform.select({
      ios: {
        shadowRadius: hasError ? 0 : 5,
      },
      android: {},
    }),
  }),
  icon: {
    color: '#000',
  },
  placeholderStyle: {
    fontFamily: themeStyle.fontRegular,
    fontSize: themeStyle.fontSizeRegular,
    color: themeStyle.fontColor,
    marginHorizontal: 5,
  },
  backDrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerLabelTitle: {
    color: '#666666',
    fontSize: 20,
  },
  pickerView: {
    backgroundColor: 'white',
    width: '96%',
    borderRadius: 10,
    height: 330,
    position: 'absolute',
    bottom: 20,
  },
  androidPickerStyle: {
    width: '100%',
    fontFamily: themeStyle.fontRegular,
    fontSize: themeStyle.fontSizeRegular,
    backgroundColor: 'transparent',
    lineHeight: 16,
    color: themeStyle.fontColor,
  },
  pickerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    fontSize: 24,
    borderColor: '#cecece',
  },
  pickerStyle: {
    bottom: 35,
    height: 100,
  },
  buttonText: {
    color: '#2A8CFF',
    fontSize: 20,
  },
  pickerConfirm: {
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: '#cecece',
    top: 110,
  },
  labelStyle: {
    marginBottom: 10,
  },
  androidPickerIcon: {
    color: '#000',
    position: 'absolute',
    alignItems: 'center',
    right: 10,
  },
  flagWrapper: {
    height: 30,
    width: 30,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagWrapperAndroid: {
    height: 30,
    width: 30,
    borderRadius: 30,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMsg: {
    marginTop: 5,
    color: theme.red,
  },
});
