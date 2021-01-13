import React from 'react';
import {StyleSheet, TouchableOpacity, Platform, Dimensions} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import theme from '~/components/theme/Style';
import {SemiBoldText} from '~/components/ui/Text';
import {ButtonSvgBg, ButtonShadowView} from '~/components/ui/Image';

export default function Button(props) {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      onPress={props.onPress}
      activeOpacity={0.65}
      style={[props.style, buttonTouchableOpacity(props)]}>
      <ButtonSvgBg {...props} />
      <ButtonShadowView {...props} />
      <SemiBoldText
        style={[
          Platform.OS === 'ios' ? styles.buttonAlignment : null,
          buttonTextStyle(props),
        ]}
        text={props.text ? props.text : 'Button'}
      />
    </TouchableOpacity>
  );
}

function buttonTextStyle(btntextprops) {
  return {
    lineHeight: btntextprops.smallButton ? 40 : 50,
    width: btntextprops.buttonWidth ? btntextprops.buttonWidth + 5 : 150,
    color: btntextprops.buttonInvert ? theme.white : theme.white,
    fontFamily: theme.fontSemiBold,
    fontSize:
      btntextprops.style === undefined ||
      btntextprops.style.fontSize === undefined
        ? 16
        : btntextprops.style.fontSize,
    textAlign: 'center',
    borderRadius: 5,
    position: 'absolute',
  };
}

function buttonTouchableOpacity(btnprops) {
  return {
    opacity: btnprops.disabled ? 0.4 : 1,
    width: btnprops.buttonWidth ? btnprops.buttonWidth : null,
    // paddingLeft: btnprops.buttonWidth ? 4 : null,
    borderRadius: 0,
  };
}

Button.defaultProps = {
  buttonWidth: Dimensions.get('screen').width - 40,
};

export function BackButton({style}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.backButtonStyle, style && style]}
      onPress={() => navigation.goBack()}>
      <Svg
        width="49"
        height="19"
        viewBox="0 0 49 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          d="M11.5318 9.21332H2.69857L6.55768 5.3542C6.8661 5.04579 6.8661 4.53968 6.55768 4.23127C6.48452 4.15796 6.39762 4.09979 6.30196 4.06011C6.20629 4.02043 6.10374 4 6.00017 4C5.8966 4 5.79404 4.02043 5.69838 4.06011C5.60271 4.09979 5.51581 4.15796 5.44265 4.23127L0.231266 9.44265C0.157955 9.51581 0.0997938 9.60271 0.0601102 9.69838C0.0204266 9.79404 0 9.8966 0 10.0002C0 10.1037 0.0204266 10.2063 0.0601102 10.302C0.0997938 10.3976 0.157955 10.4845 0.231266 10.5577L5.44265 15.7691C5.51587 15.8423 5.60278 15.9004 5.69844 15.94C5.7941 15.9796 5.89663 16 6.00017 16C6.10371 16 6.20623 15.9796 6.30189 15.94C6.39755 15.9004 6.48447 15.8423 6.55768 15.7691C6.6309 15.6959 6.68897 15.6089 6.7286 15.5133C6.76822 15.4176 6.78861 15.3151 6.78861 15.2116C6.78861 15.108 6.76822 15.0055 6.7286 14.9098C6.68897 14.8142 6.6309 14.7273 6.55768 14.654L2.69857 10.7949H11.5318C11.9668 10.7949 12.3226 10.4391 12.3226 10.0041C12.3226 9.56918 11.9668 9.21332 11.5318 9.21332Z"
          fill="#1F1F1F"
        />
        <Path
          d="M17.666 5.00586H20.6328C22.0091 5.00586 23.0026 5.20638 23.6133 5.60742C24.2285 6.00846 24.5361 6.64193 24.5361 7.50781C24.5361 8.09115 24.3857 8.5765 24.085 8.96387C23.7842 9.35124 23.3512 9.59505 22.7861 9.69531V9.76367C23.488 9.89583 24.0029 10.1579 24.3311 10.5498C24.6637 10.9372 24.8301 11.4635 24.8301 12.1289C24.8301 13.0267 24.5156 13.7308 23.8867 14.2412C23.2624 14.7471 22.3919 15 21.2754 15H17.666V5.00586ZM19.2998 9.13477H20.8721C21.5557 9.13477 22.0547 9.02767 22.3691 8.81348C22.6836 8.59473 22.8408 8.22559 22.8408 7.70605C22.8408 7.23665 22.6699 6.89714 22.3281 6.6875C21.9909 6.47786 21.4531 6.37305 20.7148 6.37305H19.2998V9.13477ZM19.2998 10.4609V13.626H21.0361C21.7197 13.626 22.2347 13.4961 22.5811 13.2363C22.932 12.972 23.1074 12.5573 23.1074 11.9922C23.1074 11.4727 22.9297 11.0876 22.5742 10.8369C22.2188 10.5863 21.6787 10.4609 20.9541 10.4609H19.2998ZM31.4678 15L31.1465 13.9473H31.0918C30.7272 14.4076 30.3604 14.722 29.9912 14.8906C29.6221 15.0547 29.1481 15.1367 28.5693 15.1367C27.8265 15.1367 27.2454 14.9362 26.8262 14.5352C26.4115 14.1341 26.2041 13.5667 26.2041 12.833C26.2041 12.0537 26.4935 11.4658 27.0723 11.0693C27.651 10.6729 28.5329 10.4564 29.7178 10.4199L31.0234 10.3789V9.97559C31.0234 9.49251 30.9095 9.13249 30.6816 8.89551C30.4583 8.65397 30.1097 8.5332 29.6357 8.5332C29.2484 8.5332 28.877 8.59017 28.5215 8.7041C28.166 8.81803 27.8242 8.95247 27.4961 9.10742L26.9766 7.95898C27.3867 7.74479 27.8356 7.58301 28.3232 7.47363C28.8109 7.3597 29.2712 7.30273 29.7041 7.30273C30.6657 7.30273 31.3903 7.51237 31.8779 7.93164C32.3701 8.35091 32.6162 9.00944 32.6162 9.90723V15H31.4678ZM29.0752 13.9062C29.6585 13.9062 30.1257 13.7445 30.4766 13.4209C30.832 13.0928 31.0098 12.6348 31.0098 12.0469V11.3906L30.0391 11.4316C29.2826 11.459 28.7311 11.5866 28.3848 11.8145C28.043 12.0378 27.8721 12.3818 27.8721 12.8467C27.8721 13.1839 27.9723 13.446 28.1729 13.6328C28.3734 13.8151 28.6742 13.9062 29.0752 13.9062ZM37.9072 15.1367C36.7633 15.1367 35.8929 14.804 35.2959 14.1387C34.7035 13.4688 34.4072 12.5094 34.4072 11.2607C34.4072 9.98926 34.7171 9.01172 35.3369 8.32812C35.9613 7.64453 36.8613 7.30273 38.0371 7.30273C38.8346 7.30273 39.5524 7.45085 40.1904 7.74707L39.7051 9.03906C39.026 8.77474 38.4655 8.64258 38.0234 8.64258C36.7155 8.64258 36.0615 9.51074 36.0615 11.2471C36.0615 12.0947 36.2233 12.7327 36.5469 13.1611C36.875 13.585 37.3535 13.7969 37.9824 13.7969C38.6979 13.7969 39.3747 13.6191 40.0127 13.2637V14.665C39.7256 14.8337 39.418 14.9544 39.0898 15.0273C38.7663 15.1003 38.3721 15.1367 37.9072 15.1367ZM43.3418 11.0078L44.251 9.87305L46.5342 7.43945H48.3867L45.3447 10.6865L48.5781 15H46.6914L44.2646 11.6846L43.3828 12.4092V15H41.79V4.36328H43.3828V9.55176L43.3008 11.0078H43.3418Z"
          fill="#1F1F1F"
        />
      </Svg>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButtonStyle: {
    // marginVertical: 10,
  },
  smallButton: {
    height: 50,
    paddingTop: 5,
    marginLeft: -3,
  },
  buttonWidth: {
    width: 150,
  },
  buttonAlignment: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
