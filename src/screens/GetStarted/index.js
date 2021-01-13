import React, {useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import theme from '~/components/theme/Style';
import FooterButton from '~/components/ui/FooterButton';
import NTextInput from '~/components/ui/TextInput';
import {RegularText} from '~/components/ui/Text';
import AuthHeader from '~/components/ui/AuthHeader';
import GenericView from '~/components/ui/GenericView';
import {KeyboardAwareView} from '~/presentation';
import {NAVIGATION_TO_PHONE_VERIFICATION_CODE_SCREEN} from '../../navigation/routes';
import {useSelector} from 'react-redux';

export default function Signup({navigation}) {
  const phoneNumber = useSelector(state => state.signup.phoneNumber);

  return (
    <GenericView padding scrollable keyboardView>
      <KeyboardAwareView>
        <AuthHeader
          back
          title={"Let's \nGet Started"}
          intro={
            'Please enter your phone number here and \nWe will send you and auth code'
          }
        />
        <View>
          <NTextInput
            editable={false}
            label={'Phone Number'}
            leftIcon={
              <Image source={require('../../assets/image/UsaCode.png')} />
            }
            inputParentStyles={styles.inputParentStyleMarginBottom}
            value={phoneNumber}
            keyboardType="phone-pad"
            returnKeyType="go"
            blurOnSubmit={true}
          />
          <FooterButton
            text="Send Authorization Code"
            style={styles.continueBtn}
            onPress={() =>
              navigation.navigate(NAVIGATION_TO_PHONE_VERIFICATION_CODE_SCREEN)
            }
          />
          {/* <View style={styles.flexRow}>
            <RegularText
              text={'Already Have an Account. '}
              style={[styles.introText]}
            />
            <RegularText
              text={'Login Here'}
              style={[styles.loginText]}
              onPress={() => navigation.goBack()}
            />
          </View> */}
        </View>
      </KeyboardAwareView>
    </GenericView>
  );
}

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  loginText: {
    color: theme.red,
  },
  continueBtn: {
    marginTop: 5,
    marginBottom: 8,
  },
  inputParentStyleMarginBottom: {
    marginBottom: 20,
  },
});
