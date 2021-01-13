import React from 'react';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import theme from '~/components/theme/Style';
import {HamburgerSvgIcon} from '~/components/ui/Icon';
import {SemiBoldText} from '~/components/ui/Text';
import {BackButton} from '~/components/ui/Button';

export default function Header({title = '', backButtonVisible = false}) {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <View
        style={
          Platform.OS === 'ios'
            ? styles.headerContentIos
            : styles.headerContentAndroid
        }>
        <View style={styles.buttonNavigation}>
          {backButtonVisible ? (
            <TouchableOpacity style={styles.leftIcon}>
              <BackButton navigation={navigation} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              style={styles.leftIcon}>
              <HamburgerSvgIcon />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.headerTitle}>
          <SemiBoldText text={title} style={styles.headerTitleText} />
        </View>
        <View style={styles.headerLogo}>
          <Image source={require('../../assets/image/HeaderLogo.png')} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 10,
    alignItems: 'center',
  },
  headerContentIos: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContentAndroid: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  buttonNavigation: {},
  leftIcon: {
    width: 40,
    padding: 5,
    left: 14,
    bottom: 1,
  },
  headerLogo: {
    justifyContent: 'center',
    right: 20,
    bottom: 3,
  },
  headerTitle: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleText: {
    fontSize: 18,
    color: theme.secondaryColor,
  },
  backButtonStyle: {
    bottom: 18,
  },
});
