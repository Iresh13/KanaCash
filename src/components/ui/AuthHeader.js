import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import theme from '~/components/theme/Style';
import {HomeIcon} from '~/components/ui/Icon';
import {SemiBoldText, RegularText} from '~/components/ui/Text';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {NAVIGATION_TO_CALCULATOR_SCREEN} from '../../navigation/routes';
// import {HeaderLogo} from '~/components/ui/Image';
export default function AuthHeader({
  back,
  title,
  intro,
  containerStyle,
  logoStyle,
}) {
  const navigation = useNavigation();

  const onPressHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        key: null,
        routes: [{name: NAVIGATION_TO_CALCULATOR_SCREEN}],
      }),
    );
    // navigation.navigate(NAVIGATION_TO_CALCULATOR_SCREEN);
  };

  return (
    <View style={[styles.containerStyle, containerStyle && containerStyle]}>
      {back ? (
        <TouchableOpacity onPress={onPressHome}>
          <HomeIcon />
        </TouchableOpacity>
      ) : (
        <View style={styles.separator} />
      )}
      <View style={[styles.logo, logoStyle && logoStyle]}>
        {/* <HeaderLogo /> */}
        <Image
          source={require('../../assets/image/logo.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <SemiBoldText text={title} style={[styles.titleText(intro)]} />
      {intro && <RegularText text={intro} style={[styles.introText]} />}
    </View>
  );
}

AuthHeader.defaultProps = {};

const styles = StyleSheet.create({
  containerStyle: {},
  separator: {
    marginVertical: 9,
  },
  titleText: intro => ({
    marginTop: intro ? -40 : 0,
    marginBottom: 18,
    lineHeight: 40,
    fontSize: 35,
    color: theme.secondaryColor,
  }),
  introText: {
    fontSize: 16,
    lineHeight: 18,
    marginBottom: 18,
  },
  logo: {
    marginVertical: 50,
  },
  image: {
    width: 150,
  },
});
