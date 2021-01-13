import React from 'react';
import Clipboard from '@react-native-community/clipboard';
import {StyleSheet, TextInput, View, Platform} from 'react-native';
import theme from '~/components/theme/Style';
class OtpInputs extends React.Component {
  static defaultProps = {
    inputCode: 4,
  };

  state = {otp: [], focusedIndex: null, hasKeySupport: Platform.OS === 'ios'};
  otpTextInput = [];

  componentDidMount() {
    this.otpTextInput[0].focus();
  }

  renderInputs() {
    const inputs = Array(this.props.inputCode).fill(0);
    const txt = inputs.map((i, j) => (
      <View
        key={j}
        style={[
          styles.inputWrapper,
          this.props.inputWrapper && this.props.inputWrapper,
          styles.focusInputWrapperStyle(j === this.state.focusedIndex),
        ]}>
        <TextInput
          selectionColor="#fff"
          onFocus={() => this.setState({focusedIndex: j})}
          onBlur={() => this.setState({focusedIndex: null})}
          style={[
            styles.inputStyle,
            styles.focusInputStyle(j === this.state.focusedIndex),
          ]}
          value={this.state.otp[j]}
          keyboardType={Platform.select({
            ios: 'number-pad',
            android: 'numeric',
          })}
          onChangeText={v => this.onChangeText(j, v)}
          onKeyPress={e => this.onKeyPressInput(e.nativeEvent.key, j)}
          ref={ref => (this.otpTextInput[j] = ref)}
          // selection={Platform.select({
          //   ios: {},
          //   android: {start: 1, end: 1},
          // })}
        />
      </View>
    ));
    return txt;
  }

  onKeyPressInput = (key, index) => {
    this.onKeyPress(key, index);
    if (Platform.OS === 'ios') {
      return;
    }
    if (!this.state.hasKeySupport && !isNaN(key)) {
      this.setHasKeySupport(true);
    }
  };

  onKeyPress = async (key, index) => {
    if (key === 'Backspace') {
      if (index !== 0) {
        this.otpTextInput[index - 1].focus();
        this.otpTextInput[index].clear();
      }
      this.handleInputValue(index, '');
    } else {
      console.log(`focus previous key => ${key} and index => ${index}`);
      this.handleInputValue(index, key);
    }
  };

  handleOnPaste = value => {
    const splitedValue = value.split('');
    this.setState({otp: splitedValue});
    this.props.getOtp(splitedValue.join(''));
  };

  handleInputValue = (index, value) => {
    if (index < this.otpTextInput.length - 1 && value) {
      this.otpTextInput[index + 1].focus();
    }
    if (index === this.otpTextInput.length - 1) {
      this.otpTextInput[index].blur();
    }
    const otp = this.state.otp;

    if (!this.state.hasKeySupport) {
      if (otp.length > 1) {
        console.log('value', value);
        value = value.toString().substring(value.length - 1);
      }
    }

    otp[index] = value;
    this.setState({otp});
    this.props.getOtp(otp.join(''));
  };

  onChangeText = async (index, value) => {
    const copiedContent = await Clipboard.getString();
    if (copiedContent === '') {
      return;
    }
    const isPasted = value.includes(copiedContent);
    if (isPasted) {
      this.setState({otp: []}, () => {
        let filterCopiedContent = copiedContent.substring(
          0,
          this.props.inputCode,
        );
        this.handleOnPaste(filterCopiedContent);
      });
      return;
    }
    if (Platform.OS === 'ios') {
      return;
    }
    if (!this.state.hasKeySupport) {
      this.onKeyPress(value, index);
    }
  };

  render() {
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        <View style={styles.gridPad}>{this.renderInputs()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  gridPad: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputWrapper: {
    borderWidth: 1,
    width: 60,
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
    borderColor: '#5C5C5C',
  },

  focusInputWrapperStyle: isFocus => ({
    backgroundColor: isFocus ? theme.secondaryColor : '#fff',
  }),

  inputStyle: {
    textAlign: 'center',
    alignItems: 'center',
    color: theme.secondaryColor,
    fontSize: 18,
    fontWeight: '600',
  },
  focusInputStyle: isFocus => ({
    color: isFocus ? '#fff' : theme.secondaryColor,
  }),
});

export default OtpInputs;
