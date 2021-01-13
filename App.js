/**
 * KanaCash App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {StyleSheet, StatusBar, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {useSelector} from 'react-redux';
import AlertModal from '~/components/ui/Modal';
import Loader from '~/components/ui/Loader';
import GenericView from '~/components/ui/GenericView';
import {navigationRef} from '~/navigation/RootNavigation';

// app navigator
import AuthNavigator from '~/navigation/AuthNavigator/';
import DrawerNavigator from '~/navigation/MainStack/';

const App: () => React$Node = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isLoading = useSelector(state => state.loader.presentLoader);
  const showModal = useSelector(state => state.modal.presentModal);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <GenericView>
      <NavigationContainer
        style={styles.navigationContainer}
        ref={navigationRef}>
        <StatusBar barStyle={'default'} animated />
        {isAuthenticated ? <DrawerNavigator /> : <AuthNavigator />}
        {showModal ? <AlertModal /> : null}
        {isLoading ? <Loader /> : null}
      </NavigationContainer>
    </GenericView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default App;
