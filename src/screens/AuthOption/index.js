import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AuthHeader from '~/components/ui/AuthHeader';
import GenericView from '~/components/ui/GenericView';
import Button from '~/components/ui/Button';
import {
  NAVIGATION_TO_LOGIN_SCREEN,
  NAVIGATION_TO_USER_INFORMATION_SCREEN,
} from '../../navigation/routes';

export default function AuthOption({navigation}) {
  return (
    <GenericView padding>
      <AuthHeader title={'Complete \nyour transfer'} back />
      <Button
        text="First time user? Sign Up"
        style={styles.buttonStyle}
        onPress={() =>
          navigation.navigate(NAVIGATION_TO_USER_INFORMATION_SCREEN)
        }
      />
      <Button
        text="Already have an account? Login here"
        buttonInvert
        backgroundColor="black"
        onPress={() => navigation.navigate(NAVIGATION_TO_LOGIN_SCREEN)}
      />
    </GenericView>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginBottom: 20,
  },
});
