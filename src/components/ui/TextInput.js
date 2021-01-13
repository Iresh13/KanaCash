import React from 'react';
import ShadowView from 'react-native-simple-shadow-view';
import {View, TextInput, StyleSheet} from 'react-native';
import theme from '~/components/theme/Style';
import {RegularText} from '~/components/ui/Text';

export default class NTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      autoFocus: this.props.autoFocus,
      text: this.props.value,
    };
  }

  render() {
    return (
      <View style={[styles.container, this.props.inputParentStyles]}>
        {this.props.label && (
          <RegularText text={this.props.label} style={styles.labelStyle} />
        )}
        <ShadowView
          style={[
            this.props.shadow && shadowViewStyle(),
            styles.inputParent,
            inputTextReasonValidation(
              this.props.textAreaHasError,
              this.props.multiline,
            ),
            this.props.hasError ? styles.validationOnStyle : null,
            this.props.textInputWrapper,
          ]}>
          {this.props.leftIcon && (
            <View style={styles.leftIcon}>{this.props.leftIcon}</View>
          )}
          <TextInput
            style={[
              styles.textInputStyles,
              this.props.multiline ? textHeightStyle() : null,
            ]}
            {...this.props.attributes}
            onFocus={this.props.onFocus}
            placeholder={this.props.placeholder}
            placeholderTextColor={theme.fontColor}
            selectionColor={theme.primaryColor}
            secureTextEntry={this.props.password ? true : false}
            keyboardType={
              this.props.KeyboardType ? this.props.KeyboardType : 'default'
            }
            returnKeyLabel={
              this.props.returnKeyLabel ? this.props.returnKeyLabel : 'Next'
            }
            returnKeyType={
              this.props.returnKeyType ? this.props.returnKeyType : 'next'
            }
            blurOnSubmit={this.props.blurOnSubmit ? this.blurOnSubmit : false}
            autoFocus={this.state.autoFocus}
            ref={this.props.inputRef}
            onSubmitEditing={
              this.props.onSubmitEditing ? this.props.onSubmitEditing : null
            }
            editable={this.props.editable ? false : true}
            value={this.props.value !== '' ? this.props.value : null}
            multiline={this.props.multiline ? this.props.multiline : false}
            numberOfLines={this.props.multiline ? 4 : null}
            onChangeText={text => {
              this.setState({text});
              this.props.onChangeText(text);
            }}
            {...this.props}
          />
        </ShadowView>
        {this.props.hasError && this.props.errorMessage ? (
          <RegularText text={this.props.errorMessage} style={styles.errorMsg} />
        ) : (
          <></>
        )}
      </View>
    );
  }
}

function textHeightStyle() {
  return {
    height: 127,
    textAlignVertical: 'top',
    paddingTop: 20,
  };
}

function shadowViewStyle() {
  return {
    shadowColor: '#666666',
    shadowOpacity: 0.28,
    shadowOffset: {width: 0, height: 0},
  };
}

function inputTextReasonValidation(textAreaHasError, multiline) {
  return {
    // borderWidth: textAreaHasError && multiline ? 1 : 'transparent',
    borderColor: textAreaHasError && multiline ? 'red' : '#d3d3d3',
    // shadowRadius: textAreaHasError && multiline ? 0 : 5,
  };
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  labelStyle: {
    marginBottom: 10,
  },
  textInputStyles: {
    height: 50,
    width: '100%',
    color: theme.fontColor,
    fontFamily: theme.inputFont,
    fontSize: 18,
  },
  validationOnStyle: {
    // borderWidth: 1,
    borderColor: 'red',
    // marginBottom: 5,
  },
  inputParent: {
    paddingHorizontal: 10,
    height: 52,
    width: '100%',
    borderRadius: 5,
    backgroundColor: theme.white,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    color: theme.fontColor,
    fontFamily: theme.inputFont,
    fontSize: 18,
  },
  leftIcon: {
    marginRight: 8,
  },
  errorMsg: {
    marginTop: 5,
    color: theme.red,
  },
});
