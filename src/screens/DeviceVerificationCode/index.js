import React, {useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import theme from '~/components/theme/Style';
import FooterButton from '~/components/ui/FooterButton';
import {RegularText} from '~/components/ui/Text';
import OtpInputs from '~/components/ui/OtpInputs';
import GenericView from '~/components/ui/GenericView';
import AuthHeader from '~/components/ui/AuthHeader';
import {setError} from '~/store/actions/Error';
import {
  resendDeviceVerificationCodeApi,
  verifyDeviceVerificationApi,
} from '../../store/actions/DeviceVerificationAction';

export default function EmailVerificationCode({navigation}) {
  const [otp, setOtp] = useState('');
  const dispatch = useDispatch();
  const [resendMessage, setResendMessage] = useState('');

  const getOtp = otp => {
    setOtp(otp);
  };

  const onPressContinue = () => {
    setResendMessage('');
    if (otp.length === 6) {
      const body = {
        device: otp,
      };
      dispatch(verifyDeviceVerificationApi(body));
    } else {
      let modalConfig = {
        message: 'Please enter the valid access code',
        message_title: 'Invalid Code',
      };
      dispatch(setError(modalConfig));
    }
  };

  const onResendVerificationCode = () => {
    setResendMessage('');
    dispatch(resendDeviceVerificationCodeApi('resend')).then(response => {
      if (response.status === 200) {
        setResendMessage('Successfully Sent the code');
      } else {
        setResendMessage(
          response.data?.message
            ? response.data.message
            : 'Failed to Sent the code',
        );
      }
    });
  };

  return (
    <GenericView padding scrollable>
      <AuthHeader
        title={'Enter \nThe Access Code'}
        intro={
          'please enter the six-digit access code we \nsent to your email address'
        }
      />

      <View style={styles.formWrapper}>
        <OtpInputs
          inputWrapper={{width: 50}}
          inputCode={6}
          getOtp={otp => getOtp(otp)}
          containerStyle={styles.otpInputStyle}
        />

        {resendMessage !== '' ? <RegularText text={resendMessage} /> : <></>}

        <FooterButton
          text="Verify & Continue"
          style={styles.continueBtn}
          onPress={onPressContinue}
        />
        <View style={styles.flexRow}>
          <RegularText
            text={"Didn't get the code? "}
            style={[styles.introText]}
          />
          <RegularText
            text={'Resend'}
            style={[styles.resendText]}
            onPress={onResendVerificationCode}
          />
        </View>
      </View>
    </GenericView>
  );
}

const styles = StyleSheet.create({
  formWrapper: {
    marginTop: 7,
    alignItems: 'center',
  },
  continueBtn: {
    marginTop: 5,
    marginBottom: 8,
    fontSize: 18,
  },
  otpInputStyle: {
    marginBottom: 20,
  },
  flexRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendText: {
    color: theme.red,
  },
});
